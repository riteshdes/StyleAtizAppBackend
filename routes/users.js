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


  var email = req.body.email;
  var password = req.body.password;
// console.log('email: ' + email);
// res.send( {message: email} );

  connection.query(
"SELECT email, password, userType FROM User WHERE email = ? AND password = ?",
[email, password]
  , function(err, row, field)  {
    console.log('email: ' + email);
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
