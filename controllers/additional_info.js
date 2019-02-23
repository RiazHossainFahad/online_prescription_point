var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

router.get('/',(req, res) => {
 if(req.session.u_id != null)
 res.render('signup/doctor_additional_info',{u_type:req.session.u_type});
 else
 res.redirect('/login');
});

router.post('/',(req, res) => {

 var sql = "insert into additional_info values('',"+req.session.u_id+",'"+req.body.doctor_hospital_name+"','"+req.body.doctor_degree+"','"+req.body.doctor_lic_no+"')";

 db.getResults(sql, function(result){
  if(result.affectedRows > 0){
  console.log("info addeded");

  var sql_update = "update users_info SET user_account_status = 1 where user_id ='"+req.session.u_id+"'";
  db.getResults(sql_update,function(status_update){
   if(status_update.affectedRows > 0){
    res.redirect('/');
   };
  });
  }
 });

});

module.exports = router;