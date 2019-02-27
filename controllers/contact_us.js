var express   = require('express');
var contactUs = require.main.require('./model/contact_us-model');
var router    = express.Router();

router.get('/', (req, res)=> {
res.redirect('/');  
});

router.post('/',function(req,res){
  var nonUserData = {
    contact_us_email:   req.body.contact_us_email,
    contact_us_comment: req.body.contact_us_comment
  };
      
  contactUs.insrtToContactUs(nonUserData, function(status){
    if(status){ 
    res.redirect('/');
    }
  });
});

module.exports = router;