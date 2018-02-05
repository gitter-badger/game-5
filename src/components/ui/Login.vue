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
    window.ws.on('login', (data) => {
      console.log(data);
    });
  },
  methods: {
    cancel() {
      this.$emit('go:login');
    },
    login() {
      const data = { username: this.username, password: this.password };

      window.ws.emit('login', data);
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


