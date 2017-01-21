var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});;

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING, allowNull: false, len: [1,50]
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

module.exports = {
  Page: Page,
  User: User
};