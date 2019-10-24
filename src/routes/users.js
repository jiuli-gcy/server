import express from 'express'
import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

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
        res.json({success:true});
    } else {
        res.status(400).json(errors);
    }
});

export default router;