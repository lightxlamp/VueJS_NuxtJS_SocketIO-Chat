<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8>
      <v-card min-width="500px">
        <v-card-title>Nuxt Chat</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-text-field
              v-model="name"
              :counter="16"
              :rules="nameRules"
              label="Name"
              required
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
      </v-btn> -->
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations } from "vuex";
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
    lazy: false
  }),

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

        this.$socket.emit("completeUser", user, data => {
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
