export const state = () => ({
    
})

export const actions = {
    SOCKET_newMessageStore(context, data) {
        console.log('Message received: ', data);
    }
}