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