<template>
  <v-col cols="12">
    <v-text-field
      label="Type a message"
      v-model="messageText"
      @keydown.enter="send"
      outlined
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
      this.$socket.emit(
        "createMessage",
        {
          text: this.messageText,
          id: this.$store.state.user.id
        },
        data => {
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
