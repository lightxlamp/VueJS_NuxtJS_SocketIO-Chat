// we don't need to create a route config in NUXT // route creates
automatically, when a new file adds (to pages folder probably)

<template>
  <div>
    <ul>
        <li v-for="m in messages" :key="m.text">
            {{m.text}}
        </li>
    </ul>  
    <!-- <h1>Chat page of "{{ user.name }}" user</h1> -->
    <!-- <v-btn @click="printMapState" color="success"
      >Print mapState to console</v-btn
    > -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["user", "messages"]),
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
