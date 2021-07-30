<template>
  <div class="user">
    <a-button @click="back">Back</a-button> &nbsp;
    <a-button @click="redirect">Redirect</a-button> &nbsp;
    <a-button @click="forward">Forward</a-button> <br />
    <h2>This is user page</h2>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    redirect() {
      this.$router.push({ name: "Filter" });
    },
    back() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(1);
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 10px;
  background: grey;
}
</style>
