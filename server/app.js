const app = require("express")();
const server = require("http").createServer(app); // node native
const io = require("socket.io")(server); // Sockets configurated. Now we can use them
const users = require("./users")();
const stasTestModule = require('./stasTestingExportModule');

function message(name, text, id) {
  return { name, text, id };
}

io.on("connection", socket => {
  console.log("IO connected");

  socket.on("userConnecting", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("User name or(and) chat room is missing");
    }

    // You can call join to subscribe the socket to a given channel:
    socket.join(data.room); // https://socket.io/docs/rooms-and-namespaces/#Joining-and-leaving

    users.remove(socket.id)

    users.add({
      id: socket.id, 
      name: data.name, 
      room: data.room
    })

    callback({ userID: socket.id });
    socket.emit("newMessage", message("admin", `Welcome ${data.name}`));
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
    if (!data.text) {
      return callback("Text can't be empty");
    }

    const user = users.get(data.id);
    if (user) {
      // sending to all users in room, including sender
      io.to(user.room).emit(
        "newMessage",
        message(user.name, data.text, data.id)
      );
    }
    callback();
  });

  // Test area
  socket.emit('newMessageStore', 'can you hear me?', 1, 2, 'abc'); // https://socket.io/docs/emit-cheatsheet/
  socket.emit("newMessageStore", { text: "Test message from server" });

  //Export module testing 
  console.log('Fav Author: '          + stasTestModule.favoriteAuthor.name);
  console.log('Fav Book: '            + stasTestModule.favoriteBook().title);
  console.log('Get Reccomendations: ' + stasTestModule.getBookRecommendations()[2].title);
});

module.exports = {
  app,
  server
};
