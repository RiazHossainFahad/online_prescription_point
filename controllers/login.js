var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('/',(req,res) => {
 var error = {
  errors: req.session.errors
 };
 req.session.errors = null;
res.render('login/index',error);
});

router.post('/',(req,res) => {

 req.check('u_email','Invalid e-mail address').isEmail();
 req.check('u_pass','Empty Password').notEmpty().rtrim();

 var err = req.validationErrors();

 if(!err){
  req.session.errors = null;
 var user={
  u_email: req.body.u_email,
  u_pass: req.body.u_pass
 };
userModel.validate(user,function(result){
 if(result.user_id != null){
  req.session.u_id   = result.user_id;
  req.session.u_type = result.user_type;
  req.session.u_loc  = result.user_location;

  if(req.session.u_type == "Admin"){
   res.redirect('/home-admin'); 
  }else
  res.redirect('/home');
 }
 else{
  res.redirect('/login');
 }
});
}else{
 req.session.errors = err;
 res.redirect('/login');
}

});

module.exports = router;