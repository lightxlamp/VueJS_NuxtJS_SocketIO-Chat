export const state = () => ({
  user: {},
  messages: [],
  usersInRoom: [],
  typingUsers: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    (state.user = {}), (state.messages = [], state.usersInRoom = []);
  },
  SOCKET_newMessage(state, message) {
    console.log('SOCKET_newMessage', message);
    state.messages.push(message);
  },
  SOCKET_updateListOfUsersInRoom(state, usersInRoom) {
    state.usersInRoom = usersInRoom
    console.log('Users in room' + state.usersInRoom);
  },
  SOCKET_isTyping(state, user) {
    state.typingUsers.push(user);
    console.log('SOCKET_isTypingUser', user);
  },

  SOCKET_stoppedTyping(state, user) {
    let arr = state.typingUsers;
    for( let i = 0; i < arr.length; i++){
      if ( arr[i] === user) {
        arr.splice(i, 1);
      }
    }
    state.typingUsers = arr;
    console.log('SOCKET_StoppedTypingUser', user);
  }
};

export const actions = {
  SOCKET_newMessageStore(context, data) {
    console.log("Message received by store: ", data);
  }
};
