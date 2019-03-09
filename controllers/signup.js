var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('/',(req,res)=>{
 var err = {
  errors: req.session.errors
 };
 req.session.errors = null;
res.render('signup/index',err);
});


router.post('/',function(req, res){

 req.check('f_name','Empty FirstName').notEmpty().rtrim;
 req.check('l_name','Empty LastName').notEmpty().rtrim();
 req.check('u_email','Invalid e-mail address').isEmail();
 req.check('u_pass','Missmatched password or length less than 4').isLength({min:4}).equals(req.body.confirm_pass);
 req.check('u_birthday','Invalid date of birth').notEmpty().rtrim();
 
 var err = req.validationErrors();
 
 if(!err){
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
  req.session.errors = null;
 userModel.insert(user,function(results){
  if(results){ 
   res.redirect('/signup');
  }else{
   res.redirect('/signup');
  }
 });
 }else{
  req.session.errors = err;
  res.redirect('/signup');
 }
});

module.exports = router;