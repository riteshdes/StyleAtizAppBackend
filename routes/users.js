var express = require('express');
var router = express.Router();
var mysql = require('mysql');

// router.get('/', function(req, res, next){
//   res.render('users', {title: 'Express' });
// });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'StyleAtizBackend'
});

connection.connect(function(err) {
  if(!!err) {
    console.log('Error');
  } else {
    console.log('Connected');
  }
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('users', { title: 'Riteshs Express Server' });
// });

router.post('/', function(req, res, next) {


  var username = req.body.username;
  var password = req.body.password;
// console.log('UserName: ' + username);
// res.send( {message: username} );

  connection.query(
"SELECT username, password, userType FROM User WHERE username = ? AND password = ?",
[username, password]
  , function(err, row, field)  {
    console.log('UserName: ' + username);
  console.log('The row selected: ' + row);

  if (err) {
    console.log(err);
    res.send({ 'success': false, 'message': 'Could Not Connect to DB'});
  }
  if(row.length > 0) {
    console.log(row[0].userType);
    res.send({'success': true, 'user': row[0].userType });

  }
  else {
    res.send({'success': false, 'message': 'User Not Found! Please try again.'});
  }
});

});

module.exports = router;
