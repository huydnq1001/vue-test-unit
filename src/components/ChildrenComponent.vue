<template>
  <p>Message: {{ props.msg }}</p>
  <button class="mr-4" @click="onClick()">Emit</button>
</template>
<script>
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "ChildrenComponent",
  props: ["msg"],
  emits: ["changeMessage"],
  setup(props, ctx) {
    const valueEmitted = ref("Value emitted");
    const onClick = () => {
      ctx.emit("changeMessage", valueEmitted.value);
    };
    return {
      props,
      onClick,
    };
  },
});
</script>
