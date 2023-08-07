const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { userJoin, getRoomUsers, userLeave } = require("./utils/users");
const formatMessage = require("./utils/messages");

const PORT = process.env.PORT || 3011;
const app = express();
app.use(cors());
const server = http.createServer(app);
const botName = "BOT";

const io = new Server(server, {
  cors: {
    origin: "https://yash-chat-app-ultra.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("User Connected : ", socket.id);

  socket.on("join_room", ({ username, room }) => {
    // socket.join(room);
    // console.log(`User with id :${socket.id} joined room ${room}`);

    // Join user to room
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome current user
    socket.emit("notification", formatMessage(botName, "Welcome to One Chat"));

    //   Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit("notification", formatMessage(botName, `${user.username} has joined the chat`));

    // Send users info
    io.to(user.room).emit("roomUsers", {
      users: getRoomUsers(user.room),
    });
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("User Disconnected : ", socket.id);

    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "notification",
        formatMessage(botName, `${user.username}  has left the chat`)
      );

      // Send users info
      io.to(user.room).emit("roomUsers", {
        users: getRoomUsers(user.room),
      });
    }
  });
});


app.get("/", (req, res) => {
  res.send(`<p>Server Started at URL:${io._opts.cors.origin} & PORT${PORT}</p> \n `);
});

app.get("/status", (req, res) => {
  res.json({ server: "active" });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
