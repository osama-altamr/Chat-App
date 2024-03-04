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
  console.log("New WebSocket connection");
  // if i used io.emit here every time a new client joined all clients would get the count .
  socket.emit("count", count);
  socket.on("increment", () => {
    count++;
    // When we use socket.emit we are emitting the event to a particular connection.
    // socket.emit('count', count);
    // I want to emit it to every single connection.
    io.emit("count", count);
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
