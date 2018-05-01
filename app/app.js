'use strict';

const express = require('express');
const app = express();
const insta = require('./insta');

app.get('/users/:uid/about', (req, res, next) => {
  let { uid } = req.params;
  insta.getMeta(uid)
    .then(meta => {
      res.status(200).json(meta);
    })
    .catch(err => console.log(err));
});

app.get('/users/:uid/posts', (req, res, next) => {
  let { uid } = req.params;
  insta.getUserPosts(uid)
    .then(posts => {
      res.status(200).send(posts)
    })
    .catch(err => console.log(err));
});

app.listen(8080);