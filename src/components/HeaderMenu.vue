<template>
  <div class="nav-bar">
    <RouterLink to="/">Home</RouterLink> |
    <RouterLink to="/about">About</RouterLink>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "HeaderMenu",
  components: {
    RouterLink,
  },
});
</script>

<style lang="scss" scoped>
a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;

  &.router-link-exact-active {
    color: #42b983;
  }
}
</style>
