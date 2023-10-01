const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser } = require("./users");

const app = express();
app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user } = addUser({ name, room });

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: `Hello ${name}` },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${name} has joined chat` },
    });

    io.to(user.room).emit("room", {
      data: { users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);
    if (user) {
      io.to(user.room).emit("message", { data: { user, message } });
    }
  });

  socket.on("left", ({ params }) => {
    const user = removeUser(params);
    const { room, name } = user;

    if (user) {
      io.to(room).emit("message", {
        data: { user: { name: "Admin" }, message: `${name} has been left` },
      });

      io.to(room).emit("room", {
        data: { users: getRoomUsers(user.room) },
      });
    }
  });

  io.on("disconnect", () => {
    console.log("Disconnect");
  });
});

server.listen(8000, () => {
  console.log("Server is running in port 8000");
});
