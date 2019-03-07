var db = require('./db');


module.exports = {
 delete: function(id, callback){
		var sql = "delete from users_info where user_id=?";
		db.execute(sql, [id], function(status){
			if(status){
    var sql = "delete from additional_info where user_id=?";
    db.execute(sql, [id], function(status_add){
     if(status_add){
      callback(true);
     }else{
      callback(false);
     }
    });
			}else{
				callback(false);
			}
		});
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

 getAllPatient: function(callback){
		var sql = "select * from prescription_info";
		db.getResults(sql, [], function(results){
			callback(results);
		});
 },
 
 //prescription table update for patient info
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
 },
 
deletePatient: function(p_id, callback){
 	var sql = "delete from prescription_info where p_id=?";
	db.execute(sql, [p_id], function(status){
  if(status){
		callback(true);
		}else{
		callback(false);
		}
	});
 }
};