<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer">
      <v-list subheader>
        <v-subheader>Users in room:</v-subheader>
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-icon>
            <v-icon v-if="user.id === 2" color="yellow">mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="user.name"></v-list-item-title>
          </v-list-item-content>

          <!-- <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar> -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
      <v-toolbar-title>"{{ user.room }}" - chat room</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <div>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: mapState(["user"]),
  data: () => ({
    drawer: true, 
    users: [
      {id: 1, name: 'User 1'}, 
      {id: 2, name: 'User 2'}, 
    ]
  }),
  methods: {
    ...mapMutations(['clearData']),
    exit() {
       this.$router.push("/?action=leftChat");
       this.clearData();
    }
  }
};
</script>
