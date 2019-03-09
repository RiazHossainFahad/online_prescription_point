var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

router.get('/',(req, res) => {
 if(req.session.u_id != null){
 var error = {
  u_type: req.session.u_type,
  errors: req.session.errors
 };
 req.session.errors = null;
  res.render('signup/additional_info', error);
 }
 else
 res.redirect('/login');
});

router.post('/',(req, res) => {

 if(req.session.u_type == "Pharmacy"){
  var addit_info = {
   u_id:                 req.session.u_id,
   doctor_hospital_name: req.body.doctor_hospital_name,
   doctor_degree:        'none',
   doctor_lic_no:        req.body.doctor_lic_no
  };
 }
 else{
  var addit_info = {
   u_id:                 req.session.u_id,
   doctor_hospital_name: req.body.doctor_hospital_name,
   doctor_degree:        req.body.doctor_degree,
   doctor_lic_no:        req.body.doctor_lic_no
  };
 }

 req.check('doctor_hospital_name','Empty hospital name').notEmpty().rtrim();
 req.check('doctor_lic_no','Empty license number').notEmpty().rtrim();

 var err = req.validationErrors();

 if(!err){
  req.session.errors = null;
 userModel.insertIntoAdditionalInfoTable(addit_info, function(result){
  if(result){
  var status={
   value: 1,
   user_id: req.session.u_id
  }; 
  userModel.updateAccountStatus(status,function(update_status){
   if(update_status){
    res.redirect('/login');
   };
  });
  }
 });
 }
 else{
  req.session.errors = err;
  res.redirect('/additional_info');
 }
});

module.exports = router;