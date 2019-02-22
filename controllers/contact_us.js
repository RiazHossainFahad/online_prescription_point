var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

router.post('/',function(req,res){
 console.log(req.body.contact_us_email);
 console.log(req.body.contact_us_comment);

  var sql = "insert into contact_us values('','"+req.body.contact_us_email+"','"+req.body.contact_us_comment+"')";

  db.getResults(sql, function(results){
   console.log(results);
        res.redirect('/');
  });
});

module.exports = router;