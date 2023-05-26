const express = require('express');
const router = express.Router();
const User = require('../models/user');

// 회원가입
router.post('/join', function(req, res, next) {
  User.create(req.body)
    .then( user => res.send(req.body) )
    .catch( err => res.status(500).send(err) )
});

// 로그인
router.get('/login', function(req, res, next) {
  res.send('auth');
});

module.exports = router;