const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');
const User = require('../models/user');
require('dotenv').config();
const { HASH_SALT } = process.env;

// 회원가입
router.post('/join', function(req, res, next) {
  const { userId, password } = req.body;

  if (!userId) return res.status(400).send("field 'userId' is required.");
  if (!password) return res.status(400).send("field 'password' is required.");
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password)) return res.status(400).send("패스워드 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자");

  const hashedPassword = CryptoJS.SHA256(password + HASH_SALT).toString();

  User.create(req.body)
    .then( user => res.status(201).send({userId, hashedPassword}) )
    .catch( err => {
      let message = "exceptional error";

      if (err.code == 11000) {
        message = "key duplicated";
      }

      res.status(500).send(message);
    } );
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