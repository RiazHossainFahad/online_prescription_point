var db = require('./db');


module.exports = {
	get: function(userId, callback){
		var sql = "select * from users_info where user_id=?";
		db.getResults(sql, [userId], function(result){

			if(result.length >0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	get_additional: function(userId, callback) {
	var sql = "select * from additional_info where user_id =?";
	db.getResults(sql, [userId], function(result){

		if(result.length >0){
			callback(result[0]);
		}else{
			callback([]);
		}
	});
},

	getAll: function(callback){
		var sql = "select * from users_info";
		db.getResults(sql, [], function(results){
			callback(results);
		});
	},

	validate: function(user, callback){
		var sql = "select * from users_info where user_email=? and user_password =?";
		db.getResults(sql, [user.u_email, user.u_pass], function(result){
			if(result.length > 0 ){
				callback(result[0]);
			}else{
				callback([]);
			}
		})
	},

	insert: function(user, callback){	
 var sql = "INSERT into users_info values(null,?,?,?,?,?,?,?,?,0)";
		db.execute(sql,
			[user.name,
				user.u_email,
				user.user_type,
				user.relationship_status,
				user.u_pass,user.u_location,
				user.u_gender,
				user.u_birthday
			],function(success){
			callback(success);
		});
	},
	
	insertIntoAdditionalInfoTable: function(user, callback){
		var sql = "INSERT into additional_info values(null,?,?,?,?)";
		db.execute(sql,
			[user.u_id,
				user.doctor_hospital_name,
				user.doctor_degree,
				user.doctor_lic_no
			],function(success){
			callback(success);
		});
	},

	insertIntoPrescriptionTable: function(user, callback){
		var sql = "INSERT into prescription_info values(null,?,?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql,
			[user.d_id,
				user.p_name,
				user.p_email,
				user.p_age,
				user.p_phone,
				user.p_gender,
				user.p_location,
				user.p_plm,
				user.p_medicine,
				user.v_date,
				user.r_msg,
				user.r_sts
			],function(success){
			callback(success);
		});
	},

	update: function(user, callback){
		var sql = "UPDATE users_info SET user_name=?,user_email=?,user_relationship_status=?,user_password=?,user_location=?,user_gender=?,user_dob=? where user_id=?";
		db.execute(sql, 
			[
				user.name,
				user.u_email,
				user.relationship_status,
				user.u_pass,
				user.u_location,
				user.u_gender,
				user.u_birthday,
				user.user_id
			],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	update_additional: function(user, callback){
		var sql_add = "UPDATE additional_info SET user_hospital=?,user_degree=?,user_license_no=? where user_id=?";
		db.execute(sql_add, 
			[
				user.hospital_name,
				user.u_degree,
				user.user_lic_no,
				user.user_id
			],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	updateAccountStatus: function(user, callback){
		var sql_update = "UPDATE users_info SET user_account_status =? where user_id =?";
		db.execute(sql_update,
			[
				user.value,
				user.user_id
			],function(status){
				console.log(user.value);
				if(status){
					callback(status);
				}else callback(false);
			});
	}
	// delete: function(user, callback){
	// 	var sql = "delete from user where id="+user.id;
	// 	db.execute(sql, function(status){
	// 		if(status){
	// 			callback(true);
	// 		}else{
	// 			callback(false);
	// 		}
	// 	});
	// }
}