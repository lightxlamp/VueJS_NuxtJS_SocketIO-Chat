export const state = () => ({
  user: {},
  messages: []
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  clearData(state) {
    (state.user = {}), (state.messages = []);
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  }
};

export const actions = {
  SOCKET_newMessageStore(context, data) {
    console.log("Message received by store: ", data);
  }
};
