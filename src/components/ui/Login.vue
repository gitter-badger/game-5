<template>
  <div>
    <input type="text" class="username" v-model="username">
    <input type="password" class="password" v-model="password">

    <button @click="login">Login</button>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  created() {
    this.$options.sockets.onmessage = this.onMessage;
  },
  methods: {
    onMessage(incoming) {
      const parsed = incoming.data;
      console.log(JSON.parse(parsed));
    },
    cancel() {
      this.$emit('go:login');
    },
    login() {
      this.$socket.sendObj({ event: 'login', username: this.username, password: this.password });
    },
  },
  data() {
    return {
      username: 'dan',
      password: 'soccer',
    };
  },
};
</script>

<style lang="scss" scoped>
button {
  font-size: 3em;
}
</style>


