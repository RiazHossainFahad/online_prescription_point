var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

router.get('/', (req, res)=> {
res.redirect('/');  
});

router.post('/',function(req,res){
  var sql = "insert into contact_us values('','"+req.body.contact_us_email+"','"+req.body.contact_us_comment+"')";

  db.getResults(sql, function(results){
      res.redirect('/');
  });
});

module.exports = router;