<template>
  <div>
    <!-- <div id="isTypingDiv">
      <p v-bind:class="{ textIsWhite: isTyping }">{{ currentlyTyping }}</p>
    </div> -->
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
    timerId: "",
    typing: false,
    timeout: undefined
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
      // console.log("User is typing");
      // this.currentlyTyping = `${this.$store.state.user.id} is typing...`;
      // this.isTyping = true;
      // if (this.timerId) {
      //   clearTimeout(this.timerId); // It works! Wow! I am genius! XD
      // }

      // this.timerId = setTimeout(() => {
      //   this.currentlyTyping = "";
      //   this.isTyping = false;
      // }, 3000);

      // const userID = {
      //   id: this.$store.state.user.id
      // };

      const userID = this.$store.state.user.id;

      if(this.typing == false) {
        this.typing = true;
        this.timeout = setTimeout(this.typingTimeoutFunction, 3000);
        this.$socket.emit("userIsTyping", userID, data => {
        if (typeof data === "string") {
          console.error(data);
          }
        });
      }
      else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.typingTimeoutFunction, 3000);
      }
    },

    typingTimeoutFunction(){
      const userID = this.$store.state.user.id;
      this.typing = false;
      this.$socket.emit("noLongerTyping", userID, data => {
        if (typeof data === "string") {
          console.error(data);
          }
        });
    }
  }
};
</script>
