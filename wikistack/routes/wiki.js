const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

// router.get('/', function(req, res, next) {
// 	Page.findAll()
// 	.then(function(allPages){
// 		var pages= allPages.map(page=>page.dataValues);
// 		res.render('index', {pages:pages});
// 	})
// 	.catch(next);
// });


router.get('/', function (req, res, next) {
	Page.findAll({
		include: [
		{model: User, as: 'Author'}
		]
	})
	.then(function (pages) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (pages === null) {
    	res.status(404).send();
    } else {
    	res.render('index', {
    		pages: pages
    	});
    }
})
	.catch(next);
});
















router.get('/users', function(req, res, next) {
	User.findAll({}).then(function(users){
		res.render('users_index', { users: users });
	}).catch(next);
});

router.get('/users/:id', function(req, res, next) {
	var userPromise = User.findById(req.params.id);
	var pagesPromise = Page.findAll({
		where: {
			AuthorId: req.params.id
		}
	});

	Promise.all([
		userPromise, 
		pagesPromise
		])
	.then(function(values) {
		var user = values[0];
		var pages = values[1];
		res.render('userpage', { user: user, pages: pages });
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
		},
		include: [
		{model: User, as: 'Author'}
		]
	})
	.then(function (page) {
    // page instance will have a .author property
    // as a filled in user object ({ name, email })
    if (page === null) {
    	res.status(404).send();
    } else {
    	res.render('wikipage', {
    		page: page
    	});
    }
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
		var page = Page.build({
			title: req.body.title,
			content: req.body.page_content
		});
		return page.save().then(function (page) {
			return page.setAuthor(user);
		});
	})
	.then(function (page) {
		res.redirect(page.urlTitle);
	})
	.catch(next);
});

module.exports = router;



















