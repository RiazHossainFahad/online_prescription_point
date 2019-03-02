var express = require('express');
var userModel      = require.main.require('./model/user-model');
var router  = express.Router();

router.get('/',(req, res) => {
 if(req.session.u_id != null)
 res.render('signup/additional_info',{u_type:req.session.u_type});
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

});

module.exports = router;