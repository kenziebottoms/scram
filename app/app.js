'use strict';

const express = require('express');
const app = express();
const insta = require('./insta');

app.get('/user/:uid', (req, res, next) => {
  let { uid } = req.params;
  insta.getMeta(uid)
    .then(meta => {
      res.status(200).json(meta);
    })
    .catch(err => console.log(err));
});

app.listen(8080);