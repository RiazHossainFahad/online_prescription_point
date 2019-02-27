var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('/',(req,res)=>{
res.render('signup/index',{success:false,error: req.session.error});
req.session.error = null;
});


router.post('/',function(req, res){

 var user={
  name: req.body.f_name+" "+req.body.l_name,
  u_email: req.body.u_email,
  user_type: req.body.user_type,
  relationship_status: req.body.relationship_status,
  u_pass: req.body.u_pass,
  u_location: req.body.u_location,
  u_gender: req.body.u_gender,
  u_birthday: req.body.u_birthday
 };

 userModel.insert(user,function(results){
  if(results){ 
   req.session.error = "Successfully sign-up";
   res.redirect('/signup');
  }else{
   req.session.error = "Error occcurs on sign-up";
   success = false; 
   res.redirect('/signup');
  }
 });

});

module.exports = router;