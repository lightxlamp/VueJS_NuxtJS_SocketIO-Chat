<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="650px">
      <v-list-item-title subheader>
        <v-subheader>Users in room:</v-subheader>
        <!-- <v-list-item v-for="user in users" :key="user.id">  -->
        <v-list-item v-for="u in usersInRoom" :key="u.id">
          <v-list-item-icon>
            <!-- id of iterated user = id of a logged in user -->
            <v-icon v-if="u.id === user.id" color="yellow">mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="u.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-title>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
      <v-toolbar-title>"{{ user.room }}" - chat room</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div style="height: 100%">
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const stasTestModule = require("../server/stasTestingExportModule");
export default {
  computed: mapState(["user", "usersInRoom"]),
  data: () => ({
    drawer: true,
    // users: [
    //   { id: 1, name: "User 1" },
    //   { id: 2, name: "User 2" },
    //   { id: 3, name: stasTestModule.favoriteAuthor.name } //it was interesting for me.
    //   //Can I use exported modules in layouts as well? :p
    // ]
  }),
  methods: {
    ...mapMutations(["clearData"]),
    exit() {
      console.log('User pressed Back button');
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?action=leftChat");
        this.clearData();
      });
    }
  }
};
</script>
