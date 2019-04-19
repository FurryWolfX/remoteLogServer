const express = require("express");
const router = express.Router();
const getIpArray = require("../utils/ip");
const wsServer = require("../utils/wsServer");

router.get("/", function(req, res, next) {
  res.render("index", { title: "远程log调试服务", ip: getIpArray()[0] });
});

router.post("/log/send", function(req, res, next) {
  const type = req.body.type; // error,log,warn
  const msg = req.body.msg;
  const time = req.body.time; // 2019-04-19 16:11
  const label = req.body.label;
  wsServer.connections.forEach(function(conn) {
    conn.sendText(JSON.stringify({ type, msg, time, label }));
  });
  res.send({success: true});
});

module.exports = router;
