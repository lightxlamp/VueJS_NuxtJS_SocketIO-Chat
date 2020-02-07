import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      //connection: 'http://localhost:3000', // https://www.youtube.com/watch?v=VFFr9PYgRGY
      connection: '/', // Uderstood issues on heroku with a help of video mentioned above. 9:58
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
