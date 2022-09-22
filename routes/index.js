//CONNECTIONS
var express = require('express');
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")




router.get('/', function(req, res, next) {
  var connection = new MySql({
    user: connection_details.user,
    password: connection_details.password,
    host: connection_details.host,
    database: connection_details.database
  })
  var blood = connection.query('select * from donar inner join blood on donar.donar_id = blood.donar_id;')

  res.render('index', { title: 'donar blood List', blood: blood, page_header: '', link: '' });
});



//ADD FUNCTION
router.get('/add', function(req, res, next){
  var connection = new MySql({
    user: 'root',
    password: 'password',
    host: connection_details.host,
    database: connection_details.database
  });
  var blood = connection.query('select * from donar;')

  res.render('add_blood', { blood: blood} )
});

router.post("/add", function(req, res, next) {
  var blood = req.body.blood
  var bloodtrans = req.body.bloodtrans
  var donar_id = req.body.donar_id


  //CONNECTION RETRIEVAL
  var connection = new MySql({
    user: 'root',
    password: 'password',
    host: connection_details.host,
    database: connection_details.database
  });


  // BOOLEAN FROM DATABASE(CHECKBOX)
  if(bloodtrans === 'on') {
    bloodtrans = true;
  } else {
    bloodtrans = false;
  }
  connection.query("INSERT INTO blood(blood, bloodtrans, donar_id) VALUES ((?), (?), (?));", [blood, bloodtrans, donar_id]);

  console.log(req.body)
  res.redirect("/")
})

module.exports = router;
