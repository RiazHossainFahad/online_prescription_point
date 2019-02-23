var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

//ROUTES
router.get('/',(req,res) => {

 if(req.session.u_id != null){
 var sql = "select * from users_info where user_id='"+req.session.u_id+"'";

 db.getResults(sql,function(result){

  if(result.length > 0){
   if(result[0].user_account_status == 0){
    res.redirect('/additional_info');
   }
   else{
    res.render('home/index',result);
   }
  }
 });
 }
 else{
  res.redirect('/login');
  }

});

module.exports = router;