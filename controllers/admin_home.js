var express   = require('express');
var adminModel = require.main.require('./model/admin-model');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('*', function(req, res, next){
	if(req.session.u_id != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',(req,res) => {
 userModel.get(req.session.u_id,(result)=>{
  var data = {user_info: result};
  res.render('admin/index', data);
 });
});

router.get('/admin-edit_account',(req,res) => {
 userModel.get(req.session.u_id,(result_info) => {
  if(result_info.user_id != null){
    var data = {
      user_info: result_info,
      errors:    req.session.errors
    };
   res.render('admin/edit_profile',data);
  }
  else{res.redirect('/home-admin')}
});
});

router.post('/admin-edit_account',(req, res) => {

  req.check('name', 'Empty name').notEmpty().rtrim();
  req.check('u_email', 'Invalid e-mail').isEmail();
  req.check('u_pass', 'Invalid password length').isLength({min: 4});
  req.check('u_birthday', 'Invalid date of birth').notEmpty().rtrim();
  
  var err = req.validationErrors();
  if(!err){
    req.session.errors = null;
 var update_user = {
   name:                 req.body.name,
   u_email:              req.body.u_email,
   user_type:            req.body.user_type,
   relationship_status:  req.body.relationship_status,
   u_pass:               req.body.u_pass,
   u_location:           req.body.u_location,
   u_gender:             req.body.u_gender,
   u_birthday:           req.body.u_birthday,
   user_id:              req.session.u_id
 };

  //update user_info table information
 userModel.update(update_user, (user_update_status)=>{
  if(user_update_status){
   res.redirect('/home-admin');
  }else{
   res.redirect('/home-admin/admin-edit_account');
  }
 });
}else{
  req.session.errors = err;
  res.redirect('/home-admin/admin-edit_account');
}
});

router.get('/user_list',(req, res) => {

  userModel.getAll(function(results){
  var data = {
   admin_id: req.session.u_id,
   uList: results
  };
  res.render('admin/user_list', data);
  });
});

router.get('/edit/:id', function(req, res){

 userModel.get(req.params.id, (result_info) => {
  if(result_info != ""){
     //info from additional_info table 
   userModel.get_additional(req.params.id, (result_add_info) => {
   if(result_add_info != ""){
    var data = {
     user_info:  result_info,
     add_info:   result_add_info,
     errors:     req.session.errors
    }
    req.session.errors = null;
    res.render('admin/edit_user_profile',data); //render edit_profile view with the data
  }

  else{
   res.redirect('/home-admin/user_list');
  }
 });
}
else{
 res.redirect('/home-admin/user_list');
}
});
});

router.post('/edit/:id',(req, res) => {
  req.check('name', 'Empty name').notEmpty().rtrim();
  req.check('u_email', 'Invalid e-mail').isEmail();
  req.check('u_pass', 'Invalid password length').isLength({min: 4});
  req.check('u_birthday', 'Invalid date of birth').notEmpty().rtrim();
  req.check('hospital_name', 'Empty hospital name').notEmpty().rtrim();
  req.check('user_lic_no', 'Empty license number').notEmpty().rtrim();

  var err = req.validationErrors();
  if(!err){
    req.session.errors = null;
 var update_user = {
   name:                 req.body.name,
   u_email:              req.body.u_email,
   user_type:            req.body.user_type,
   relationship_status:  req.body.relationship_status,
   u_pass:               req.body.u_pass,
   u_location:           req.body.u_location,
   u_gender:             req.body.u_gender,
   u_birthday:           req.body.u_birthday,
   user_id:              req.params.id
 };

  //update user_info table information
 userModel.update(update_user, (user_update_status)=>{
  if(user_update_status){
 
   //update additional_info table info
  var additional = {
   hospital_name: req.body.hospital_name,
   u_degree:      req.body.u_degree,
   user_lic_no:   req.body.user_lic_no,
   user_id:       req.params.id
  };
 
  userModel.update_additional(additional,(user_add_update_status)=>{

   if(user_add_update_status){
    res.redirect('/home-admin/user_list');
   }
  });
  }
 });
  }
  else{
    req.session.errors = err;
    res.redirect('/home-admin/edit/'+req.params.id);
  }
});

router.get("/delete/:id", function(req, res){

	adminModel.delete(req.params.id, function(status){
			res.redirect('/home-admin/user_list');
	});
});


//patient list
router.get('/patient_list',(req, res) => {

  adminModel.getAllPatient(function(results){
  var data = {
   admin_id: req.session.u_id,
   uList: results
  };
  res.render('admin/patient_list', data);
  });
});

router.get('/edit-patient/:id', function(req, res){

  adminModel.get(req.params.id, (result_info) => {
   if(result_info != ""){
    var data = {
      user_info:  result_info,
      errors:     req.session.errors
     }
     req.session.errors = null;
     res.render('admin/edit_patient_profile',data); //render edit_profile view with the data
   }else{
    res.redirect('/home-admin/patient_list');
   }
 });
 });
 
 router.post('/edit-patient/:id',(req, res) => {
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
    user_id:    req.params.id
  };
 
   //update user_info table information
  adminModel.update(update_user, (user_update_status)=>{
   if(user_update_status){
    res.redirect('/home-admin/patient_list');
   }
  });
}else{
  req.session.errors = err;
  res.redirect('/home-admin/edit-patient/'+req.params.id);
}
 });

 //delete patient
 router.get("/delete-patient/:id", function(req, res){

	adminModel.deletePatient(req.params.id, function(status){
    if(status)
			res.redirect('/home-admin/patient_list');
	});
});

module.exports = router;