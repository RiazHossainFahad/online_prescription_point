var db = require('./db');

module.exports = {
 validate: function(patient, callback){
		var sql = "select * from prescription_info where p_email=? and p_phone =?";
		db.getResults(sql, [patient.u_email, patient.u_pass], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
 },
 
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
 
 update: function(user, callback){
		var sql = "UPDATE prescription_info SET p_name=?, p_email=?,p_age=?,p_phone=?,p_gender=?,p_location=? where p_id=?";
		db.execute(sql, 
			[
				user.name,
				user.u_email,
				user.u_age,
				user.u_phone,
				user.u_gender,
				user.u_location,
				user.user_id
			],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
 }

};