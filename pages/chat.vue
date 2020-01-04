// we don't need to create a route config in NUXT // route creates
automatically, when a new file adds (to pages folder probably)

<template>
  <div>
    <h1>Chat Page {{ user.name }}</h1>
    <v-btn @click="printMapState" color="success"
      >Print mapState to console</v-btn
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["user"]),
  middleware: ["chat"],
  head () {
      return {
          title: `Welcome to ${this.user.room} room` // TODO learn more about mapState
      }
  },
  methods: {
    printMapState() {
      console.log(mapState(["user"]));
    }
  }
};
</script>
