module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("connection");
    socket.on("join room", (data) => {
      console.log("join room");
      console.log(data);
      socket.join(data.room);
    });

    socket.on("leave room", (data) => {
      console.log("leaving room");
      console.log(data);
      socket.leave(data.room);
    });

    socket.on("disconnect", (reason) => {
      console.log("user disconnected");
    });

    socket.on("new message", (data) => {
      console.log(data)
      socket.broadcast.to(data.room).emit("receive message", data);
    });
  });
};
