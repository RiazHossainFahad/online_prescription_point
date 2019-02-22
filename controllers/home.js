var express = require('express');
var db      = require.main.require('./model/db');
var router  = express.Router();

//ROUTES
router.get('/',(req,res) => {
res.render('home/index');
req.session.error = null;
});

module.exports = router;