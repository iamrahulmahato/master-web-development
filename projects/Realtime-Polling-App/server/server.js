const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let pollData = {
  question: "What's your favorite programming language?",
  options: ["JavaScript", "Python", "Java", "C++"],
  votes: [0, 0, 0, 0],
};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.emit("pollData", pollData);

  socket.on("vote", (optionIndex) => {
    pollData.votes[optionIndex]++;

    io.emit("pollData", pollData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
