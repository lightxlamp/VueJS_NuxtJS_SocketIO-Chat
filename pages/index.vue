<template>
  <v-layout column justify-center align-center row wrap>
    <v-flex xs12 sm8>
      <v-card class="loginWindow" min-width="300px" width="500px" color="primary">
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" top>
          {{ popupMessageText }}
          <v-btn dark text @click="snackbar = false">
            Close
          </v-btn>
        </v-snackbar>

        <v-card-title>Nuxt Chat</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
              color="yellow"
            ></v-text-field>

            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Enter room"
              required
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>

      <!-- <v-btn @click="newMessage">
        New message by Stas
      </v-btn>  -->
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
import { red } from "color-name";
export default {
  layout: "start_layout",
  head: {
    title: "Welcome to NuxtJS Chat"
  },
  sockets: {
    connect() {
      console.log("Client IO connected");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 16) || "Name must be less than 16 characters"
    ],
    room: "",
    roomRules: [
      v => !!v || "Room is required",
      v => (v && v.length >= 3) || "Room must be more than 3 characters"
    ],
    snackbar: false,
    timeout: 6000,
    color: "secondary",
    popupMessageText: "",
    lazy: false
  }),

  mounted() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.popupMessageText = "Enter user data";
    } else if (message === "leftChat") {
      this.popupMessageText = "You've left a chat room";
    }
    this.snackbar = !!this.popupMessageText; // Casting to boolean
  },

  methods: {
    newMessage() {
      this.$socket.emit("createMessage", {
        text: "From client"
      });
    },

    ...mapMutations(["setUser"]),

    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };

        this.$socket.emit("userConnecting", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userID;
            this.setUser(user);
            this.$router.push("/chat");
          }
        });
      }
    }
  }
};
</script>

<style>
html {
  overflow-y: auto;
}
/* https://stackoverflow.com/questions/55818172/how-to-change-error-color-of-vuetify-component */
/* .loginWindow .v-application .error--text{
  color: white !important;
} */

.loginWindow.error--text,
.loginWindow .error--text {
  color: rgb(0, 0, 0) !important;
  caret-color: rgb(2, 0, 0) !important;
}
</style>
