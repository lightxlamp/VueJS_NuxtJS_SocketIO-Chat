<template>
  <div>
    <div id="isTypingDiv">
      <p v-bind:class="{ textIsWhite: isTyping }">{{ currentlyTyping }}</p>
    </div>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Type a message and press enter"
          outlined
          v-model="messageText"
          @keydown="isKeyDown"
          @keydown.enter="send"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    messageText: "",
    currentlyTyping: "",
    isTyping: false,
    timerId: ""
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
          console.log("Callback data", data);
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.messageText = "";
          }
        }
      );
    },
    isKeyDown() {
      console.log("User is typing");
      this.currentlyTyping = `${this.$store.state.user.id} is typing...`;
      this.isTyping = true;
      if (this.timerId) {
        clearTimeout(this.timerId); // It works! Wow! I am genius! XD
      }

      this.timerId = setTimeout(() => {
        this.currentlyTyping = "";
        this.isTyping = false;
      }, 3000);

      const user = {
        id: this.$store.state.user.id
      };

      this.$socket.emit("userIsTyping", user, data => {
        if (typeof data === "string") {
          console.error(data);
        }
      });
    }
  }
};
</script>
