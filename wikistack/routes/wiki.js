const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	res.redirect('/');
});

// router.post('/', function(req, res, next) {
// 	console.log('req.body',req.body)
//  res.send({request:req.body})
// });


router.get('/add', function(req, res) {
	res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

	Page.findOne({ 
		where: { 
			urlTitle: req.params.urlTitle 
		} 
	})
	.then(function(foundPage){
		console.log('found: ' , foundPage.dataValues)
		var page = foundPage.dataValues
		res.render('wikipage', {page:page});
	})
	.catch(next);

});

router.post('/', function(req, res, next) {
	console.log(req.body)
	var page = Page.build({
		title: req.body.title,
		content: req.body.page_content
	});
	page.save().then(function(savedPage){
  		res.redirect(savedPage.urlTitle); // route virtual FTW
  }).catch(next);
});

module.exports = router;



















