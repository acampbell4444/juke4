var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: true});;
var marked = require('marked');

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, 
        allowNull: false, 
        len: [1,50]
    },
    urlTitle: {
        type: Sequelize.STRING, 
        allowNull: false, 
        isUrl: true 
    },
    content: {
        type: Sequelize.TEXT, 
        allowNull: false, 
        len: [1,500]
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'), 
        defaultValue: 'open'
    },
    tags: {
     type: Sequelize.ARRAY(Sequelize.TEXT),
     defaultValue: [] 
    }
   }, {
    getterMethods: {
        renderedContent: function(){return marked(this.content)}
    }
   

});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING, allowNull: false, len: [1,50]
    },
    email: {
        type: Sequelize.STRING, allowNull: false, isEmail:true, len: [1,40]
    }
});

// Method 2 via the .hook() method
Page.hook('beforeValidate', function(page, options) {
  page.urlTitle = page.title.replace(/\s+/g, '_');
})


// Method 3 via the direct method
// User.beforeCreate(function(user, options) {
//   return hashPassword(user.password).then(function (hashedPw) {
//     user.password = hashedPw;
//   });
// })

// User.afterValidate('myHookAfter', function(user, options, fn) {
//   user.username = 'Toni'
// })

Page.belongsTo(User, { as: 'Author' });

module.exports = {
  Page: Page,
  User: User
};