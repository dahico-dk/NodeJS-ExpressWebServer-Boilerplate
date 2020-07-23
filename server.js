global.__basedir = __dirname;
const app = require("./src/app");
const debug = require("debug")("node-angular");
const http = require("http");
const server = http.createServer(app);
const sockets = require(__basedir+'/SocketIO/socketserver');
const config=require("./server-config.json");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  console.log("Listening on " + bind);
};
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
!config["socket-server"]||sockets(server)



