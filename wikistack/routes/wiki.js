const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 


router.get('/', function(req, res, next) {
	
	Page.findAll()
	.then(function(allPages){
		var pages= allPages.map(page=>page.dataValues);
		res.render('index', {pages:pages});
	})
	.catch(next);
});


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


	User.findOrCreate({
		where: {
			name: req.body.author_name,
			email: req.body.author_email
		}
	})
	.then(function (values) {
		var user = values[0];
		console.log('uz',user.id)
		var page = Page.build({
			title: req.body.title,
			content: req.body.page_content
		});

		return page.save().then(function (page) {
    		return page.setAuthor(user);
  		});

	})
	.then(function (page) {
		console.log('sdfjsdkjfklasjdflsjfklsa', page.urlTitle)
		res.redirect(page.urlTitle);
	})
	.catch(next);


});

module.exports = router;



















