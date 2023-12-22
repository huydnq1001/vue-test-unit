<template>
  <div class="about">
    <h1>About Page</h1>
    <ChildrenComponent :msg="message" @change-message="changeMessage" />
    <button @click="onClick">Change message</button>
  </div>
</template>
<script>
import ChildrenComponent from "@/components/ChildrenComponent.vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "AboutView",
  components: {
    ChildrenComponent,
  },
  setup() {
    let message = ref("Hello World");
    const onClick = () => {
      message.value = "This is an about page";
    };
    const changeMessage = (value) => {
      message.value = value;
    };
    return {
      message,
      onClick,
      changeMessage,
    };
  },
});
</script>

<style></style>
