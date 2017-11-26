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
  var userType = req.body.userType;
  var name = req.body.name;

// console.log('UserName: ' + username);
// res.send( {message: username} );

  connection.query(
"INSERT INTO StylistUser(username, password, userType, email, name) VALUES (?,?,?,?,?)",
[email, password, userType, email, name]
  , function(err, row, field)  {
    console.log('The row selected: ' + row);

  if (err) {
    console.log(err);
    res.send({ 'success': false, 'message': 'Could Not Connect to DB!!!'});
  } else {
    res.send({ 'success': true, 'message': 'Connected To DB!!!'});
  }
  // if(row.length > 0) {
  //   console.log(row);
  //   res.send({'success': true, 'user': row[0].userType });
  //
  // }
  // else {
  //   res.send({'success': false, 'message': 'User Not Found! Please try again.'});
  // }
});

});

module.exports = router;
