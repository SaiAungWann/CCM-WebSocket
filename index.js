const express = require("express");
const socket = require("socket.io");

// -------- app setup -------

const app = express();

// -------- server setup -------

const server = app.listen(4000, () => {
  console.log("project server is running on localhost:4000");
});

// -------- route setup -------

app.get("/", (res, req) => {
  // req.sendFile("/public/index.html", { root: __dirname });

  //   both of the code is working
  req.sendFile(__dirname + "/public/index.html");
});

// --------- socket setup for server side -------

const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
    console.log(name);
  });
});
