var express   = require('express');
var userModel = require.main.require('./model/user-model');
var router    = express.Router();

//ROUTES
router.get('*', function(req, res, next){
	if(req.session.u_id != null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',(req,res) => {
 userModel.get(req.session.u_id,function(result){
  if(result.user_id != null ){
   if(result.user_account_status == 0){
    res.redirect('/additional_info');
   }
   else{
   userModel.get_additional(req.session.u_id,(add_info) => {
      var data = {
        session_sucess: req.session.u_id,
        user_info:      result,
        add_info:       add_info
      };
     res.render('home/index',data);
    });

   }
  }
 });
});

//routes for /edit_profile 
router.get('/edit_profile', (req, res) => {
  if(req.session.u_id != null){
    //info from user_info table
  userModel.get(req.session.u_id,(result_info) => {
   if(result_info.user_id != null){
    
      //info from additional_info table 
    userModel.get_additional(req.session.u_id,(result_add_info) => {
    if(result_add_info.user_id != null){
     var data = {
      user_info:  result_info,
      add_info:   result_add_info
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
    
    var update_user = {
      name:                 req.body.name,
      u_email:              req.body.u_email,
      user_type:            req.body.user_type,
      relationship_status:  req.body.relationship_status,
      u_pass:               req.body.u_pass,
      u_location:           req.body.u_location,
      u_gender:             req.body.u_gender,
      u_birthday:           req.body.u_birthday,
      user_id:              req.session.u_id
    };

     //update user_info table information
    userModel.update(update_user, (user_update_status)=>{
     if(user_update_status){
    
      //update additional_info table info
     var additional = {
      hospital_name: req.body.hospital_name,
      u_degree:      req.body.u_degree,
      user_lic_no:   req.body.user_lic_no,
      user_id:       req.session.u_id
     };
    
     userModel.update_additional(additional,(user_add_update_status)=>{
  
      if(user_add_update_status){
       res.redirect('/home');
      }
     });
     }
    });
  
  
  });


  router.get('/prescription',(req, res) => {
    userModel.get(req.session.u_id,(result) => {
      if(result.user_id != null){
        userModel.get_additional(req.session.u_id,(result_add) => {
          if(result_add.user_id != null){
          var data = {
            user:      result,
            add_info : result_add
          };
          res.render('home/prescription', data);
        }
        });
      }
    });
  });

  router.post('/prescription',(req, res) => {
    var patient_info = {
      d_id : req.session.u_id,
      p_name: req.body.patient_name,
      p_age: req.body.patient_age,
      p_plm: req.body.patient_problem,
      p_email: req.body.patient_email,
      p_phone: req.body.patient_phone,
      p_gender: req.body.patient_gender,
      p_location: req.body.patient_location,
      p_medicine: req.body.patient_medicine,
      v_date: req.body.visit_date
    };
    userModel.insertIntoPrescriptionTable(patient_info,(status)=>{
      if(status){
        res.redirect('/home');
      }
      else res.redirect('/home/prescription')
    });
  });
module.exports = router;