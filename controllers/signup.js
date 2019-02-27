var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

//ROUTES
router.get('/',(req,res)=>{
res.render('signup/index',{success:false,error: req.session.error});
req.session.error = null;
});


router.post('/',function(req, res){

 var name = req.body.f_name+" "+req.body.l_name;
 var sql = "insert into users_info values('','"+name+"','"+req.body.u_email+"','"+req.body.user_type+"','"+req.body.relationship_status+"','"+req.body.u_pass+"','"+req.body.u_location+"','"+req.body.u_gender+"','"+req.body.u_birthday+"',0)";

 db.getResults(sql,function(results){
  if(results.affectedRows>0){ 
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