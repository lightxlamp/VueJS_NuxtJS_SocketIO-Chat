const app = require("express")();
const server = require("http").createServer(app); // node native
const io = require("socket.io")(server); // Sockets configurated. Now we can use them
const users = require("./users")()

function message(name, text, id) {
  return { name, text, id };
}

io.on("connection", socket => {
  console.log("IO connected");

  socket.on("completeUser", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("User name or(and) chat room is missing");
    }

    socket.join(data.room);
    callback({ userID: socket.id });
    socket.emit("newMessage", message("admin", `Welcome ${data.name}`));
    socket.emit("newMessage", message("Stas", `Test message`));
    socket.broadcast
      .to(data.room)
      .emit(
        "newMessage",
        message("admin", `User ${data.name} entered the room`)
      );
  });

  // socket.on("createMessage", data => {
  //   setTimeout(() => {
  //     socket.emit("newMessage", {
  //       text: data.text + " SERVER"
  //     });
  //   }, 500);
  // });
  
  socket.on("createMessage", (data, callback) => {
    if(!data.text){
      return callback("Text can't be empty")
    }

    const user = users.get(data.id);
    if(user)
    {
      io.to(user.room).emit('newMessage', message(user.name, data.text, data.id))
    }
    callback();
  });

  socket.emit("newMessageStore", {
    text: "Test message from server"
  });
});

module.exports = {
  app,
  server
};
