const express = require("express");
const svgCaptcha = require("svg-captcha");
const ManagerModel = require("../../model/managerModel");

const { md5 } = require("../../model/tools");

var router = express.Router();

router.get("/", async (req, res) => {
  res.render("admin/login/login.html");
});
router.post("/doLogin", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let verify = req.body.verify;
  // 1、判断验证码是否正确.toLowerCase()
  if (verify != req.session.captcha) {
    res.render("admin/public/error.html", {
      redirectUrl: "/admin/login",
      message: "图形验证码输入错误",
    });
    return;
  }
  // 2、判断用户名密码是否合法
  let result = await ManagerModel.find({
    username: username,
    password: md5(password),
  });
  if (result.length > 0) {
    //保存用户信息
    req.session.userinfo = result[0];
    //提示登录成功
    res.render("admin/public/success.html", {
      redirectUrl: "/admin",
      message: "登录成功",
    });
  } else {
    res.render("admin/public/error.html", {
      redirectUrl: "/admin/login",
      message: "用户名或者密码错误",
    });
  }
});

router.get("/verify", function (req, res) {
  var captcha = svgCaptcha.create();
  // 保存验证码
  req.session.captcha = captcha.text;
  res.type("svg");
  res.status(200).send(captcha.data);
});

router.get("/loginOut", function (req, res) {
  req.session.userinfo = null;
  res.redirect("/admin/login");
});

module.exports = router;
