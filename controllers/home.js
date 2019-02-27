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

//routes for /edit_profile 
router.get('/edit_profile', (req, res) => {

  if(req.session.u_id != null){
  var sql_info = "select * from users_info where user_id = '"+req.session.u_id+"'";//info from user_info table
  db.getResults(sql_info,(result_info) => {
   if(result_info.length > 0){
    
    var sql_add_info = "select * from additional_info where user_id = '"+req.session.u_id+"'";//info from additional_info table 
    db.getResults(sql_add_info,(result_add_info) => {
    if(result_add_info.length > 0){
     var data = {
      user_info:  result_info,
      add_info: result_add_info
     }
     res.render('home/edit_profile',data); //render edit_profile view with the data
   }
  });
  }
  });
  }
  else{
  res.redirect('/login');
  }
  });
  
  router.post('/edit_profile',(req, res) => {
    
     //update user_info table information
     var sql = "UPDATE users_info SET user_name='"+req.body.name+"',user_email='"+req.body.u_email+"',user_relationship_status='"+req.body.relationship_status+"',user_password='"+req.body.u_pass+"',user_location='"+req.body.u_location+"',user_gender='"+req.body.u_gender+"',user_dob='"+req.body.u_birthday+"' where user_id="+req.session.u_id+"";
    db.getResults(sql, (result_uu)=>{
     if(result_uu.affectedRows > 0){
  
         //update additional_info table info
     var sql_add = "UPDATE additional_info SET user_hospital='"+req.body.hospital_name+"',user_degree='"+req.body.u_degree+"',user_license_no='"+req.body.user_lic_no+"' where user_id="+req.session.u_id+"";
     db.getResults(sql_add,(result_ua)=>{
  
      if(result_ua.affectedRows > 0){
       res.redirect('/home');
      }
     });
     }
    });
  
  
  });

module.exports = router;