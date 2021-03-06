var express   = require('express');
var nodemailer = require('nodemailer');
var contactUs = require.main.require('./model/contact_us-model');
var router    = express.Router();

router.get('/', (req, res)=> {
res.redirect('/');  
});

router.post('/',function(req,res){

  req.check('contact_us_email', 'Invalid e-mail address').isEmail();
  req.check('contact_us_comment', 'Empty query field').trim().not().isEmpty();
  var err = req.validationErrors();
 //console.log(err.length);
  var nonUserData = {
    contact_us_email:   req.body.contact_us_email,
    contact_us_comment: req.body.contact_us_comment
  };
   if(!err){ 
     req.session.errors = null;  
  contactUs.insrtToContactUs(nonUserData, function(status){
    if(status){ 

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: '',
//     pass: ''
//   }
// });

// var mailOptions = {
//   from: 'mdfahad6562@gmail.com',
//   to: nonUserData.contact_us_email,
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// }); 
    res.redirect('/');
    }
  });
}else{
  req.session.errors = err;
  res.redirect('/');
}
});

module.exports = router;