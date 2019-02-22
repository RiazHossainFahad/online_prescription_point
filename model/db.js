var mysql = require('mysql');

var config = {
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'opp'
};


function getConnection(callback){
	con = mysql.createConnection(config);
	con.connect(function(err){
		if(err){
			console.log('connection error: '+err.stack);
		}else{
			console.log('connection id: '+con.threadId);
		}
	});	

	callback(con);
}


module.exports = {
	getResults: function(sql, callback){
		getConnection(function(connection){
			connection.query(sql, function(err, results){
				if(err){
					callback(err);
				}else{
					callback(results);
				}
			});

			connection.end(function(err){
				console.log('connection ending ...');
			});
		});
	}
};
