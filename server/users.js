class Users {
    constructor() {
        this.users = []
    }

    add(user){
        this.users.push(user)
    }

    get(id){
        return this.users.find(user => user.id === id)
    }

    remove(id){
        const user = this.get(id)

        if(user){
            this.users = this.users.filter(user => user.id !== id)
        }

        return user
    }

    setAsTyping(userID){
      //https://stackoverflow.com/questions/4689856/how-to-change-value-of-object-which-is-inside-an-array-using-javascript-or-jquer/50504081
      let objIndex = this.users.findIndex((obj => obj.id == userID));
      let userToModify = this.users[objIndex];
      if(userToModify){
        userToModify.isTyping = true;
      }
      //console.log('this.users', this.users);
    }

    unsetAsTyping(userID){
      let objIndex = this.users.findIndex((obj => obj.id == userID));
      let userToModify = this.users[objIndex];
      if(userToModify){
        userToModify.isTyping = false;
      }
      //console.log('this.users', this.users);
    }

    getAllUsersInRoom(room){
        const usersInRoom = this.users.filter(user => user.room === room);
        //console.log('getAllUsersInRoom: ' + JSON.stringify(usersInRoom, null, 4));
        return usersInRoom;
    }

    getAllTypingUsersInRoom(room){
      const usersInRoom = this.getAllUsersInRoom(room);
      const typingUsersInRoom = usersInRoom.filter(user => user.isTyping === true);
      //console.log('getAllTypingUsersInRoom:', JSON.stringify(typingUsersInRoom, null, 4));
      return typingUsersInRoom;
    }
}

module.exports = function() {
    return new Users()
}
