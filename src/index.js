const http = require("http");
const express = require("express");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const port = 3000 || process.env.PORT;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));
let count = 0;
io.on("connection", (socket) => {
  socket.emit("message", "Welcome!");
  socket.on("sendMessage", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
