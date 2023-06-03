const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 회원가입
router.post('/join', function(req, res, next) {
  /* check */
  if (!req.body.userId) return res.status(400).send("field 'userId' is required.");
  if (!req.body.password) return res.status(400).send("field 'password' is required.");

  User.create(req.body)
    .then( user => res.status(201).send(req.body) )
    .catch( err => res.status(500).send(err) );
});

// 로그인
router.post('/login', function(req, res, next) {
  /* check */
  if (!req.body.userId) return res.status(400).send("field 'userId' is required.");
  if (!req.body.password) return res.status(400).send("field 'password' is required.");
  
  User.findOne(req.body)
    .then( result => result ? res.send("ok") : res.status(400).send("fail") )
    .catch( err => res.status(500).send(err) );
});

module.exports = router;