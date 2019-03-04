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
	}
};