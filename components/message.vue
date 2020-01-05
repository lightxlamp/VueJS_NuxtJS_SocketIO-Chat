<template>
  <div>
    <div v-if="name === 'admin'" class="systemMessage">
      <p class="text-xs-center">{{ text }}</p>
      <hr />
    </div>

    <div v-else class="wrap">
      <div class="userMessage" :class="{ owner }">
        <small
          ><strong>{{ name }}</strong></small
        >
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.systemMessage {
  margin-bottom: 1rem;
}

.systemMessage p {
  margin-bottom: 1rem;
}

.wrap {
  display: flex;
  flex-direction: column;
}

.userMessage {
  padding: 1rem;
  width: 60%;
  margin: 0 1rem;
  box-shadow: 0 1 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
}

.userMessage p {
  margin-bottom: 0;
}

.owner {
  background: #fff;
  color: #000;
  align-self: flex-end;
}
</style>
