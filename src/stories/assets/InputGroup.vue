<template>
  <InputText
    type="text"
    :class="classes"
    @change="onChange($event)"
    :style="style"
    v-model="valueProps"
  >
  </InputText>
</template>

<script lang="ts" setup>
import InputText from "primevue/inputtext";
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    value: string;
    primary?: boolean;
    size?: "small" | "medium" | "large";
    backgroundColor?: string;
    borderColor?: string;
  }>(),
  { primary: false, value: "" }
);
const valueProps = computed(() => props.value);
const emit = defineEmits<{
  (e: string, id: number): void;
}>();

const classes = computed(() => ({
  "storybook-button": true,
  "storybook-button--primary": props.primary,
  "storybook-button--secondary": !props.primary,
  [`storybook-button--${props.size || "medium"}`]: true,
}));

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
  border: `1px solid ${props.borderColor}`,
}));

const onChange = (event) => {
  emit("change", event.target.value);
};
</script>
