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
     var sql_additional = "select * from additional_info where user_id = '"+req.session.u_id+"'";
    db.getResults(sql_additional,(add_info) => {
      var data={
        session_sucess: req.session.u_id,
        user_info: result,
        add_info: add_info
      };
     res.render('home/index',data);
    });

   }
  }
 });
 }
 else{
  res.redirect('/login');
  }
});

module.exports = router;