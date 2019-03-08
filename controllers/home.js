var express   = require('express');
var userModel = require.main.require('./model/user-model');
var pharmacyModel = require.main.require('./model/pharmacy-model');
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
     if(result.user_type == "Pharmacy"){
      pharmacyModel.getNotification(result.user_location, (result_noti) => {
        var data = {
          notification    : result_noti,
          session_sucess: req.session.u_id,
          user_info:      result,
          add_info:       add_info
        };
       res.render('home/index',data);

      });
     }else{
      pharmacyModel.getNotificationDoctor(req.session.u_id, (result_noti) => {
      var data = {
        notification    : result_noti,
        session_sucess: req.session.u_id,
        user_info:      result,
        add_info:       add_info
      };
     res.render('home/index',data);
    });
    }
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
      r_msg: null,
      r_sts: 1,
      v_date: req.body.visit_date
    };
    userModel.insertIntoPrescriptionTable(patient_info,(status)=>{
      if(status){
        res.redirect('/home');
      }
      else res.redirect('/home/prescription')
    });
  });

//show notifaction for pharmacy
router.get('/pharmacy-notification/:id', (req, res) =>{
  pharmacyModel.get( req.params.id,(result_pres)=>{
    userModel.get(result_pres.doctor_id,(result) => {
    userModel.get_additional(result_pres.doctor_id,(result_add) => {
      var data = {
        user:     result,
        add_info: result_add,
        p_info:   result_pres
      };
      res.render('home/pharmacy_change_request',data);
    });
    });
  });
});

router.post('/pharmacy-notification/:id', (req, res) => {
  var data = {
    r_msg: req.body.r_message,
    r_sts: 0,
    patient_id:  req.params.id
  };
  pharmacyModel.updatePrescriptionRequest(data, (status) => {
    if(status){
      res.redirect('/home');
    }
  });
});

//show change request to doctor
router.get('/doctor-notification/:id', (req, res) =>{
  pharmacyModel.get( req.params.id,(result_pres)=>{
    userModel.get(result_pres.doctor_id,(result) => {
    userModel.get_additional(result_pres.doctor_id,(result_add) => {
      var data = {
        user:     result,
        add_info: result_add,
        p_info:   result_pres
      };
      res.render('home/change_request_prescription',data);
    });
    });
  });
});

router.post('/doctor-notification/:id', (req, res) => {
  var data = {
    p_medicine: req.body.patient_medicine,
    r_sts: 1,
    patient_id:  req.params.id
  };
  pharmacyModel.updatePrescription(data, (status) => {
    if(status){
      res.redirect('/home');
    }
  });
});
module.exports = router;