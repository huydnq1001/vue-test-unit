import type { Meta, StoryObj } from "@storybook/vue3";

import InputGroup from "./InputGroup.vue";
const meta: Meta<typeof InputGroup> = {
  title: "Example/Input",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
    backgroundColor: { control: "color" },
    onChange: { action: "change" },
  },
  args: { primary: false, value: "", backgroundColor: "#fff" }, // default value
};

export default meta;
type Story = StoryObj<typeof InputGroup>;
export const Primary: Story = {
  args: {
    primary: true,
    value: "",
    size: "large",
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
    value: "",
  },
};

export const Large: Story = {
  args: {
    value: "",
    size: "large",
  },
};

export const Small: Story = {
  args: {
    value: "",
    size: "small",
  },
};
