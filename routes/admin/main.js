const express = require("express");

var router = express.Router()

router.get("/", (req, res) => {
    res.render("admin/main/index.html")
})
router.get("/welcome", (req, res) => {
   res.send("欢迎来到后台管理中心")
})

module.exports = router