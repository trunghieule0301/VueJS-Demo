<template>
  <div class="profile">
    <h2>This is profile page</h2>
    <router-link style="font-size: 28px" to="/user/profile/edit">
      Edit
    </router-link>
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
$background-color: rgb(65, 184, 131);
.profile {
  background: $background-color;
  padding: 10px;
}
</style>




