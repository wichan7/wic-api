// get env
require('dotenv').config();

const express = require('express');
const router = express.Router();
let debugI = require('debug')('app:inform');
let debugE = require('debug')('app:error');
const CryptoJS = require('crypto-js');
const User = require('../models/user');

// 회원가입
router.post('/join', function(req, res, next) {
  const { userId, password } = req.body;

  if (!userId)
    return res.status(400).send({resultCode: 400, resultMessage: "field 'userId' is required."});
  if (!password)
    return res.status(400).send({resultCode: 400, resultMessage: "field 'password' is required."});
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password))
    return res.status(400).send({resultCode: 400, resultMessage: "패스워드 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자"});

  const hashedPassword = CryptoJS.SHA256(password + process.env.HASH_SALT).toString();

  User.create(req.body)
    .then( user => res.status(201).send( {resultCode: 201, result: {userId, hashedPassword}}) )
    .catch( err => {
      let resultMessage = "exceptional error";

      if (err.code == 11000) {
        resultMessage = "key duplicated";
      }

      res.status(500).send({resultCode: 500, resultMessage});
    } );
});

// 로그인
router.post('/login', function(req, res, next) {
  /* check */
  if (!req.body.userId)
    return res.status(400).send({resultCode: 400, resultMessage: "field 'userId' is required."});
  if (!req.body.password)
    return res.status(400).send({resultCode: 400, resultMessage: "field 'password' is required."});
  
  User.findOne(req.body)
    .then( result => result ? res.send({resultCode: 200, resultMessage: "ok"}) : res.status(400).send({resultCode: 400, resultMessage: "fail"}) )
    .catch( err => {
      console.log(JSON.stringify(err));
      console.log("=================");
      console.log(err);
      return res.status(500).send({resultCode: 500, resultMessage: err});
     } );
});

module.exports = router;