var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

//ROUTES
router.get('/',(req,res) => {
res.render('login/index',{success:false,error: req.session.error});
req.session.error = null;
});

router.post('/',(req,res) => {
console.log(req.body);
var sql = "select * from users_info where user_email='"+req.body.u_email+"' and user_password = '"+req.body.u_pass+"'";
db.getResults(sql,function(results){
 if(results.length > 0){
  console.log("sucessfully login");
  res.redirect('/');
 }

 else{
  res.redirect('/login');
 }
});

});

module.exports = router;