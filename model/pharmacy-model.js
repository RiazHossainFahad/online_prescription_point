var db = require('./db');

module.exports = {
 get: function(userId, callback){
		var sql = "select * from prescription_info where p_id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
 },
 
 getNotification: function(u_location,callback){
		var sql = "select * from prescription_info where p_location=?";
		db.getResults(sql, [u_location], function(results){
			callback(results);
		});
 },

 getNotificationDoctor: function(d_id,callback){
		var sql = "select * from prescription_info where doctor_id=? and r_status=?";
		db.getResults(sql, [d_id, 0], function(results){
			callback(results);
		});
 },
 updatePrescription: function(data, callback){
  var sql = "UPDATE prescription_info SET p_medicine=?, r_message=?, r_status=? where p_id=?";
  db.execute(sql, [
   data.p_medicine,
   null,
   data.r_sts,
   data.patient_id
  ],(status)=>{
   if(status){
   callback(true);
   }
   else
   callback(false);
  });
 },

 updatePrescriptionRequest: function(data, callback){
  var sql = "UPDATE prescription_info SET r_message=?, r_status=? where p_id=?";
  db.execute(sql, [
   data.r_msg,
   data.r_sts,
   data.patient_id
  ],(status)=>{
   if(status){
   callback(true);
   }
   else
   callback(false);
  });
 }
};