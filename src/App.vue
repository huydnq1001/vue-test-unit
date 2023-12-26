<template>
  <div class="nav-bar">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>
<script>
import { RouterView, RouterLink } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    RouterView,
    RouterLink,
  },
});
</script>
<style lang="scss">
@import "../node_modules/primeflex/primeflex.scss";
@import "primeicons/primeicons.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
