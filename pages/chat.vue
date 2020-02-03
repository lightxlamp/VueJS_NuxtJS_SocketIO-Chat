// we don't need to create a route config in NUXT // route creates
// automatically, when a new file adds (to pages folder probably)

// From docs: The pages directory contains your Application Views and Routes.
// The framework reads all the .vue files inside this directory and creates the application router.

<template>
  <div class="chat-wrap">
    <!-- <h1>Chat page of "{{ user.name }}" user. User's id - {{ user.id}} </h1> -->
    <div class="chat" ref="block">
      <message
        v-for="m in messages"
        :key="m.text"
        :name="m.name"
        :text="m.text"
        :owner="m.id === user.id"
      />
      <!-- <h1>Chat page of "{{ user.name }}" user</h1> -->
      <!-- <v-btn @click="printMapState" color="success"
      >Print mapState to console</v-btn
    > -->
    </div>
    <div class="chat-form">
      <messageField />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import message from "@/components/message";
import messageField from "@/components/messageField";
export default {
  layout: 'defaultRenamedByStas',
  computed: mapState(["user", "messages"]),
  watch: {
    messages() {
      setTimeout(() => {
        this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
      }, 0)
    }
  },
  middleware: ["chat"],
  components: { message, messageField},
  head() {
    return {
      title: `Welcome to ${this.user.room} room` // TODO learn more about mapState
    };
  },
  methods: {
    printMapState() {
      console.log(mapState(["user"]));
    }
  }
};
</script>

<style>
html{
  overflow-y: auto !important;
}

.chat-wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chat-form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 115px;
  background: #212121;
}

.chat {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}

#isTypingDiv{
  height: 20px;
  font-size: 13px;
  border: 1px solid #303030;
}

#isTypingDiv p {
  color: white;
}

.textIsWhite {
  color: white;
}
</style>
