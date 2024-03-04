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

io.on("connection", (socket) => {
  socket.emit("message", "Welcome!");
  socket.broadcast.emit("message", "A new user has joined!");
  socket.on("sendMessage", (message) => {
    console.log(message);
    io.emit("message", message);
  });

  socket.on("location", (coords) => {
    console.log(coords);
    io.emit("message", `https://www.google.com/maps?q=${coords.lat}, ${coords.long}`);
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!");
  });
});
server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

/* 
-When we use socket.emit we are emitting the event to a particular connection.
-If i used io.emit here every time a new client joined all clients would get the count.
-I want to emit it to every single connection. So I used io.emit 
-When we broadcast an event :We send it to everybody except the current client.
-Event Acknowledgements in socketio ,example use case sending a location or a message the client sends the 
the msg or the loc to the server but it's never quite sure the server recevied it and actually did 
something,with and ack the client would get notified that the message or the location was indeed delivered
successfully  
*/
