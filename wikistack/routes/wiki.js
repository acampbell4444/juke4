const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page; 
var User = models.User; 

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

router.get('/search', function(req, res) {
	if(Object.keys(req.query).length) {
		var queryTags = req.query.tag_name.split(',').map(x=>x.trim())
		console.log('qts', queryTags)
		Page.findAll({
	    	// $overlap matches a set of possibilities
	    	where : {
	        	tags: {
	            	$overlap: queryTags
	        	}
	    	},
	    	include: [
				{model: User, as: 'Author'}
			]  
		}).then(function(pages){
			console.log('pages', pages)
			res.render('tagsearch', { pages: pages });
		})
	}else {
		res.render('tagsearch')
	}
})

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

router.get('/:urlTitle/similar', function (req, res, next) {
	var page;
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(success=>{
		page=success.dataValues;
		 console.log('page', page)
		Page.findAll({
	    	// $overlap matches a set of possibilities
	    	where : {
	        	tags: {
	            	$overlap: page.tags
	        	},
	        	urlTitle: {
	        		$ne: req.params.urlTitle
	        	}
	    	},
	    	include: [
				{model: User, as: 'Author'}
			]  
		}).then(function(pages){
				var found = pages.length ? true : false;
    			res.render('similar', { pages: pages, pagesFound: found});
		})
	})


	
	

	// Page.findAll({
	//     	// $overlap matches a set of possibilities
	//     	where : {
	//         	tags: {
	//             	$overlap: queryTags
	//         	}
	//     	},
	//     	include: [
	// 			{model: User, as: 'Author'}
	// 		]  
	// 	}).then(function(pages){
	// 		console.log('pages', pages)
	// 		res.render('tagsearch', { pages: pages });
	// 	})






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
		var tags = req.body.tags.split(',').map(x=>x.trim())
		var page = Page.build({
			title: req.body.title,
			content: req.body.page_content,
			tags: tags
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



















