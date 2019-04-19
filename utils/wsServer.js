const ws = require("nodejs-websocket");

const wsServer = ws
  .createServer(function(conn) {
    console.log("New connection");
    conn.isAlive = true;
    conn.on("close", function (code, reason) {
      console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
      console.log("异常关闭")
    });
    conn.on("pong", () => {
      conn.isAlive = true;
    });
  })
  .listen(10002);

const interval = setInterval(() => {
  wsServer.connections.forEach(c => {
    if (c.isAlive === false) {
      return c.close();
    }
    c.isAlive = false;
    c.sendPing();
  });
},6000);

module.exports = wsServer;
