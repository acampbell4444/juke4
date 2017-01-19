'use strict';
const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
const client = require('../db/index')

module.exports = io => {

  // a reusable function
  const respondWithAllTweets = (req, res, next) => {
    client.query('SELECT * FROM tweets INNER JOIN users ON tweets.user_id=users.id', function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', (req, res, next) => {
    const name = req.params.username;
    client.query('SELECT * FROM tweets INNER JOIN users ON tweets.user_id=users.id WHERE name=$1',[name], function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  });

  // single-tweet page
  router.get('/tweets/:id', (req, res, next) => {
      const id = req.params.id;
      client.query('SELECT * FROM tweets INNER JOIN users ON tweets.user_id=users.id WHERE tweets.id=$1',[id], function (err, result) {
      if (err) return next(err); // pass errors to Express
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });
  });

  // create a new tweet
  router.post('/tweets', (req, res, next) => {
    var username = req.body.name
    var text = req.body.text
  

    client.query('SELECT id FROM users WHERE name=$1',[username],function(err,result){
        if(result.rows[0]) {
          var userID =  result.rows[0].id
          client.query('INSERT INTO tweets (user_id,content) VALUES($1, $2)',[userID,text],function(err,result){
            console.log(err)
          });
        }else {
          client.query('INSERT INTO users (name, picture_url) VALUES($1,$2)',[username, 'http://i.imgur.com/XDjBjfu.jpg'], function(err,result) {
            client.query('SELECT id FROM users WHERE name=$1',[username],function(err,result){
                var userID =  result.rows[0].id
              client.query('INSERT INTO tweets (user_id,content) VALUES($1, $2)',[userID,text],function(err,result){
              });
            });
          });
        }
    });
    // io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });







  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', => (req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
