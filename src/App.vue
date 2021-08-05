<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider theme="light" v-model="collapsed" collapsible>
      <div class="logo">
        <img src="./assets/logo.png" alt="logo" />
      </div>
      <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="home" />
          <span>Home</span>
          <router-link to="/" />
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="filter" />
          <span>Filter</span>
          <router-link to="/filter" />
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="api" />
          <span>Axios</span>
          <router-link to="/axios" />
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>User</span></span>
          <a-menu-item key="4">
            Profile
            <router-link to="/user/profile" />
          </a-menu-item>
          <a-menu-item key="5">
            Details
            <router-link
              :to="{ name: 'Details', params: { id: randomNumber() } }"
            />
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="6">
          <a-icon type="form" />
          <span>Vuelidate</span>
          <router-link to="/vuelidate" />
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="form" />
          <span>VeeValidate</span>
          <router-link to="/vee-validate" />
        </a-menu-item>
      </a-menu>
      <div style="padding: 25px">
        <p>Theme</p>
        <a-radio-group :value="theme" @change="handleChange">
          <a-radio-button value="light"> Light </a-radio-button>
          <a-radio-button value="dark"> Dark </a-radio-button>
        </a-radio-group>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <b-breadcrumb style="margin: 16px 0">
          <b-breadcrumb-item
            v-for="item in items"
            :key="item.path"
            :to="item.path"
            >{{ item.name }}
          </b-breadcrumb-item>
        </b-breadcrumb>
        <div
          v-theme="theme"
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      items: [],
      theme: "light",
    };
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  methods: {
    getRoute() {
      this.items = this.$route.matched;
    },
    handleChange(e) {
      this.theme = e.target.value;
    },
    randomNumber: function () {
      return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    },
  },
  create() {
    this.getRoute();
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

a:-webkit-any-link {
  text-decoration: none !important;
  color: grey;
}

a:-webkit-any-link:hover {
  text-decoration: none !important;
  color: rgb(75, 75, 75);
}

#components-layout-demo-side .logo img {
  height: 40px;
}
</style>