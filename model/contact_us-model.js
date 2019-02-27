var db = require('./db');

module.exports = {
insrtToContactUs: function(data, callback) {
 var sql = "insert into contact_us values(null,?,?)";

 db.execute(sql, [data.contact_us_email,data.contact_us_comment],function(success){
  callback(success);
 });
}
};