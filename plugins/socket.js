import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      //connection: 'http://localhost:3000', // https://www.youtube.com/watch?v=VFFr9PYgRGY
      connection: '/', // https://www.youtube.com/watch?v=VFFr9PYgRGY
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
