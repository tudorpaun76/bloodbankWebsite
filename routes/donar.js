//CONNECTIONS

var express = require("express");
var router = express.Router();
var MySql = require('sync-mysql');
var connection_details = require("../modules/connection_details")



// INDEX HOME
router.get('/', function(req, res, next) {
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var donar = connection.query("SELECT * from donar");
  console.log(donar);
  res.render('donar', { title: 'Express', donar:donar });
});


// ADD FUNCTION GET 
router.get('/add', function(req, res, next){
  res.render('add_donar', {title: 'Add donar member'})
})


// DELETE FUNCTION GET
router.get('/delete', function(req, res, next) {
  var donar_id = req.query.donar_id
  var connection = new MySql({
    user: connection_details.user,
    password: connection_details.password,
    host: connection_details.host,
    database: connection_details.database
  });
  connection.query("DELETE FROM donar where donar_id = (?);", [donar_id])
  res.redirect('/donar')
})



// ADD POST
router.post('/add', function(req, res, next) {
  var name = req.body.name
  var address = req.body.address
  var contact = parseFloat(req.body.contact)
  var bloodtD = req.body.bloodtD
  var connection = new MySql({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  })
  connection.query("INSERT INTO donar (name, address, contact, bloodtD) VALUES ((?), (?), (?), (?));", [name, address, contact, bloodtD]);
  res.redirect("/donar");
})
//UPDATE GET


router.get('/update', function(req, res, next){
  var donar_id = req.query.donar_id
  var error = req.query.error
  res.render('update_donar', {donar_id: donar_id, error:error} )
})
//UPDATE POST


router.post('/update', function(req, res, next){
  var donar_id = req.body.donar_id
  var name = req.body.name
  var contact = parseFloat(req.body.contact)
  var address = req.body.address
  var bloodtD = req.body.bloodtD
  var connection = new MySql({
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database,
    host: connection_details.host
  }) // UPDATE STATEMENTS
  var query_string = "UPDATE donar set"
  var params = []
  if(name) {
    query_string += ' name = (?)'
    params.push(name)
  }
  if(!isNaN(contact)) {
    if(name) {
      query_string +=", "
    }
    query_string += ' contact = (?) '
    params.push(contact)
  }
  if(address) {
    if(name || contact) {
      query_string +=", "
    }
    query_string += ' address = (?) '
    params.push(address)
  }
  if(bloodtD) {
    if(name || contact || address) {
      query_string +=", "
    }
    query_string += ' bloodtD = (?) '
    params.push(bloodtD)
  }
  query_string += "WHERE donar_id = (?)"
  if(!name && !contact && !bloodtD && !address) {
    res.redirect("/donar/update?donar_id=" + donar_id + "&error=You must update some fields")
  }
  params.push(donar_id)
  connection.query(query_string, params)
  res.redirect('/donar')
})

module.exports = router;
