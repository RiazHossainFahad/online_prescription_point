var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('/',(req,res) => {
res.render('login/index',{success:false,error: req.session.error});
req.session.error = null;
});

router.post('/',(req,res) => {
 var user={
  u_email: req.body.u_email,
  u_pass: req.body.u_pass
 };

userModel.validate(user,function(result){
 if(result.user_id != null){
  req.session.u_id = result.user_id;
  req.session.u_type = result.user_type;

  if(req.session.u_type == "Admin"){
   res.redirect('/home-admin'); 
  }else
  res.redirect('/home');
 }

 else{
  req.session.error = "invalid user";
  res.redirect('/login');
 }
});

});

module.exports = router;