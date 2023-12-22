<template>
  <HeaderMenu />
  <RouterView />
</template>
<script>
import HeaderMenu from "@/components/HeaderMenu.vue";
import { RouterView } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    HeaderMenu,
    RouterView,
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
