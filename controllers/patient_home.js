var express      = require('express');
var patientModel = require.main.require('./model/patient-model');
var userModel = require.main.require('./model/user-model');
var router       = express.Router();

router.get('*', function(req, res, next){
	if(req.session.u_id != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',(req, res) => {
 patientModel.get(req.session.u_id, (result)=>{
  var data = {
   p_info: result
  };
  res.render('patient/index',data);
 });
});

//edit patient account info
router.get('/edit-account', (req, res) => {
 patientModel.get(req.session.u_id, (result_info) => {
  if(result_info != ""){
   var data = {
     user_info:  result_info,
     errors:     req.session.errors
    }
    req.session.errors = null;
    res.render('patient/edit_profile',data); //render edit_profile view with the data
  }else{
   res.redirect('/home-patient');
  }
});
});

router.post('/edit-account', (req, res) => {
 req.check('name','Empty name field').notEmpty().rtrim(); 
 req.check('u_email','Invalid e-mail address').isEmail(); 
 req.check('u_phone','Invalid phone number').isNumeric().isLength({min:11});
 
 var err = req.validationErrors();
 if(!err){
   req.session.errors = null;
var update_user = {
  name:       req.body.name,
  u_email:    req.body.u_email,
  u_phone:    req.body.u_phone,
  u_location: req.body.u_location,
  u_gender:   req.body.u_gender,
  u_age:      req.body.u_age,
  user_id:    req.session.u_id
};

 //update user_info table information
patientModel.update(update_user, (update_status)=>{
 if(update_status){
  res.redirect('/home-patient');
 }
});
}else{
req.session.errors = err;
res.redirect('/home-patient/edit-account');
}
});

//view prescription for patient
router.get('/view-prescription', (req, res) => {
 patientModel.get(req.session.u_id, (result)=>{//get info for patient
  if(result.p_id !=null){
   userModel.get(result.doctor_id, (result_doc)=>{//get info for doctor who wrote the prescription
    userModel.get_additional(result.doctor_id, (result_doc_add)=>{//get additonal info for doctor
     var data = {
      v_pres: result,
      d_info: result_doc,
      d_add:  result_doc_add
     };
     console.log(data);
     res.render('patient/view_prescription', data);
    });
   });
  }
 });
});
module.exports = router;