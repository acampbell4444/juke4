const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
	console.log('req.body',req.body)
 res.send({request:req.body})
});


router.get('/add', function(req, res) {
  res.render('addpage');
});



module.exports = router;