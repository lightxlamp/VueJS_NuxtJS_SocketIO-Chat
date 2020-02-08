// https://dev.to/lawrence_chinedu/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl
// Causes of Heroku H10-App Crashed Error.
var express = require("express");
var app = express();
// app.set('port', process.env.PORT || 1789); // overridden by a similar statement in bin/www
// process.env.PORT=1789;
const server = require("http").createServer(app); // node native
const io = require("socket.io")(server); // Sockets configurated. Now we can use them
const users = require("./users")();
// const stasTestModule = require("./stasTestingExportModule");

function message(name, text, id) {
  return { name, text, id };
}

io.on("connection", socket => {
  console.log("IO connected");
  //console.log('Server:' + JSON.stringify(server, null, 4));

  socket.on("userConnecting", (data, callback) => {
    if (!data.name || !data.room) {
      return callback("User name or(and) chat room is missing");
    }

    // You can call join to subscribe the socket to a given channel:
    socket.join(data.room); // https://socket.io/docs/rooms-and-namespaces/#Joining-and-leaving

    users.remove(socket.id); // if this user was already logged in before

    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    });

    // Test print
    str = JSON.stringify(users);
    //console.log('All users: ' + str); // Logs output to dev tools console.
    usersObj = JSON.stringify(users, null, 4); // (Optional) beautiful indented output.
    //console.log('All users: ' + usersObj); // Logs output to dev tools console.

    callback({ userID: socket.id });

    // sending to individual socketid (private message)
    io.to(data.room).emit(
      "updateListOfUsersInRoom",
      users.getAllUsersInRoom(data.room)
    );

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

  socket.on("userIsTyping", (userID, callback) => {
    const user = users.get(userID);
    // users.getAllUsersInRoom(user.room);
    //users.setAsTyping(userID);
    //console.log('This user is typing', user);
    socket.broadcast
      .to(user.room)
      .emit(
        "isTyping",
        user
      );
      callback();
  });

  socket.on("noLongerTyping", (userID, callback) => {
    const user = users.get(userID);
    //users.unsetAsTyping(userID);
    //console.log('User is stopped typing', user);
    if(user){
      socket.broadcast
        .to(user.room)
        .emit(
          "stoppedTyping",
          user
        );
        callback();
    }
  });

  // if user presses "exit room" button
  socket.on("userLeft", (id, callback) => {
    //console.log('User pressed back button or refreshed the page');
    const user = users.remove(id);
    if (user) {
      io.to(user.room).emit(
        "updateListOfUsersInRoom",
        users.getAllUsersInRoom(user.room)
      );

      io.to(user.room).emit(
        "newMessage",
        message("admin", `User ${user.name} has left the room`)
      );
    }
    callback();
  });

  // if user closes a tab
  socket.on("disconnect", () => {
    const user = users.remove(socket.id);
    if (user) {
      io.to(user.room).emit(
        "updateListOfUsersInRoom",
        users.getAllUsersInRoom(user.room)
      );

      io.to(user.room).emit(
        "newMessage",
        message("admin", `User ${user.name} has left the room`)
      );
    }
  });

  // Test area
  socket.emit("newMessageStore", "can you hear me?", 1, 2, "abc"); // https://socket.io/docs/emit-cheatsheet/
  socket.emit("newMessageStore", { text: "Test message from server" });

  //Export module testing
  // console.log("Fav Author: " + stasTestModule.favoriteAuthor.name);
  // console.log("Fav Book: " + stasTestModule.favoriteBook().title);
  // console.log(
  //   "Get Reccomendations: " + stasTestModule.getBookRecommendations()[2].title
  // );
});

module.exports = {
  app,
  server
};
