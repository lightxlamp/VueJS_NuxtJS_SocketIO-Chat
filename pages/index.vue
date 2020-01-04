<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex xs12 sm8 md6>
      <v-btn @click="newMessage"> 
        New message by Stas
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect() {
      console.log('Client IO connected');
    }
  },
  methods: {
    newMessage(){
      this.$socket.emit("createMessage", {
        text: "From client"
      })
    }
  }
}
</script>
