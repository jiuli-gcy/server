import express from 'express'
import mysql from 'mysql'
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

var db = require('../DB/connection');
var UserSQL = require('../DB/usersql');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
//var pool = mysql.createPool( dbConfig.mysql );

let router = express.Router();

const validateInput = (data) => {
    let errors = {};
//判空
    if (validator.isEmpty(data.username)) {
      errors.username = "请输入用户名！";
    }
    if (!validator.isEmail(data.email)) {
      errors.email = "请输入正确的邮箱格式！";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "请输入密码！";
    }
    if (validator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = "请再次输入密码！";
    }
//确认密码
    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "两次输入的密码不同!";
    }
  
    return {
      errors,
      isValid: isEmpty(errors)
    }
}

router.post('/',(req,res) => {
    
    console.log(req.body);
    const { errors, isValid } = validateInput(req.body);

    if (isValid){
        // 从连接池获取连接 
        //pool.getConnection(function(err, connection) {
          // 建立连接 增加一个用户信息 
          db.query(UserSQL.insert, [req.body.username,req.body.email,req.body.password], function(err, result) {
            if(result) {
              result = {
                code: 200,
                msg:'增加成功'
              };
            }
            res.json(result);

          });
        //});
    } else {
        res.status(400).json(errors);
    }
});

export default router;