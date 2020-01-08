export const state = () => ({
  user: {},
  messages: [],
  usersInRoom: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    (state.user = {}), (state.messages = [], state.usersInRoom = []);
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateListOfUsersInRoom(state, usersInRoom) {
    state.usersInRoom = usersInRoom
    console.log('Users in room' + state.usersInRoom);
  }
};

export const actions = {
  SOCKET_newMessageStore(context, data) {
    console.log("Message received by store: ", data);
  }
};
