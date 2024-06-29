const express = require("express");
const socket = require("socket.io");
const ejs = require("ejs");

// -------- app setup -------

const app = express();

// -------- view engine setup -------
app.set("view engine", "ejs");
app.set("views", "./public");

// -------- server setup -------

const server = app.listen(4000, () => {
  console.log("project server is running on localhost:4000");
});

// -------- route setup -------

app.get("/", (res, req) => {
  // req.sendFile("/public/index.html", { root: __dirname });

  //   both of the code is working
  // req.sendFile(__dirname + "/public/index.html");

  res.render("index", { root: __dirname });
});

// --------- socket setup for server side -------

const io = socket(server);
io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
    console.log(data);
  });
  socket.on("typing", (name) => {
    socket.broadcast.emit("typing", name);
    console.log(name);
  });
});
