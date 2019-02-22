//DECLARATION
var express    = require('express');
var bodyParser = require('body-parser');
var contactUs  = require.main.require('./controllers/contact_us') 

var app     = express();

//CONFIGERATION
app.set('view engine','ejs');


//MIDDLEWARES
app.use(bodyParser.urlencoded({extended: false}));
app.use('/bootstrap',express.static(__dirname+'/node_modules/bootstrap/dist/'));
//to use bootstrap as fake folder name /bootstrap
app.use('/jquery',express.static(__dirname+'/node_modules/jquery/dist/'));//to use jquery as fake folder name /jquery
app.use(express.static("public"));//for static file like images
app.use('/contact_us', contactUs);



//ROUTES
app.get('/',function(req,res){
 res.render('index');
 res.end();
});

//server
app.listen(3000,()=>{
 console.log("server started at port 3000......");
});