<template>
  <v-col cols="12">
    <v-text-field
      label="Type a message and press enter"
      outlined
      v-model="messageText"
      @keydown.enter="send"
    />
  </v-col>
</template>

<script>
export default {
  data: () => ({
    messageText: ""
  }),
  methods: {
    send() {
      // Debug info
      console.log(
        `Sending message = "${this.messageText}". User id = ${this.$store.state.user.id}`
      );

      this.$socket.emit(
        "createMessage",
        {
          text: this.messageText,
          id: this.$store.state.user.id
        },
        data => {
          console.log("Callback data" + data);
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.messageText = "";
          }
        }
      );
    }
  }
};
</script>
