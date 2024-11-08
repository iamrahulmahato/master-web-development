const express = require('express');
const app = express();
const path = require('path');

// socket.io setup
const http = require('http');
const socketio = require('socket.io'); // runs on http
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// handling connection request - function gens new socket key
io.on("connection", (socket) => {

    // show location for all the connected users
    socket.on("send-location", function(data){
        io.emit("receive-location", {id:socket.id, ...data})
    })


    // show location static when disconnected
    socket.on("disconnect", function(){
        io.emit("user-disconnected", socket.id)
    })
    //console.log("connected");
});

app.get('/', (req, res) => {
    res.render('index');
});

server.listen(3000)
