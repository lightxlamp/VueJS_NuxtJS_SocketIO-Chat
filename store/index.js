export const state = () => ({
    user : {}
})

export const mutations = {
    setUser(state, user){
        state.user = user
    }
}

export const actions = {
    SOCKET_newMessageStore(context, data) {
        console.log('Message received: ', data);
    }
}