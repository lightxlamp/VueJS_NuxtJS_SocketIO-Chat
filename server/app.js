const app = require("express")();
const server = require("http").createServer(app); // node native
const io = require("socket.io")(server); // Sockets configurated. Now we can use them

function message(name, text, id) {
  return ({name, text, id})
}

io.on("connection", socket => {
  console.log("IO connected");

  socket.on("completeUser", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("User name or(and) chat room is missing");
    }

    socket.join(data.room)
    callback({ userID: socket.id });
    socket.emit('welcomeUserMessage', message('admin', `Welcome ${data.name}`))
    socket.broadcast.to(data.room).emit('welcomeUserMessage', message('admin', `User ${data.name} entered the room`))
  });

  socket.on("createMessage", data => {
    setTimeout(() => {
      socket.emit("newMessageStore", {
        text: data.text + " SERVER"
      });
    }, 500);
  });

  socket.emit("newMessageStore", {
    text: "WHAT"
  });
});

module.exports = {
  app,
  server
};
