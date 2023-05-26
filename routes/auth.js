var express = require('express');
var router = express.Router();

// 회원가입
router.get('/join', function(req, res, next) {
  res.send('auth');
});

// 로그인
router.get('/login', function(req, res, next) {
  res.send('auth');
});

module.exports = router;