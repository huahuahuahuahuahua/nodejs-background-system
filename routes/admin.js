const express = require("express");
const router = express.Router();
// const url = require("url");

//判断用户有没有登录
// router.use((req, res, next) => {
//   var pathname = req.url;
//   console.log(pathname);
//   //   var url = new URL(req.url);
//   //   var pathname = url.pathname; // Returns:"/en-US/docs/Web/API/URL/pathname"
//   //   var pathname = url.parse(req.url).pathname;
//   if (req.session.userinfo && req.session.userinfo.username) {
//     next();
//   } else {
//     if (
//       pathname == "/login" ||
//       pathname == "/login/doLogin" ||
//       pathname == "/login/verify"
//     ) {
//       next();
//     } else {
//       res.redirect("/admin/login");
//     }
//     next();
//   }
// });

//引入模块
const main = require("./admin/main");
const user = require("./admin/user");
const login = require("./admin/login");
const nav = require("./admin/nav");
const manager = require("./admin/manager");
const focus = require("./admin/focus");

//挂载路由
router.use("/", main);
router.use("/user", user);
router.use("/login", login);
router.use("/nav", nav);
router.use("/manager", manager);
router.use("/focus", focus);
module.exports = router;
