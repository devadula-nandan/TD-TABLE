import { fn } from "@storybook/test";
import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
};

export const Primary = {
  args: {
    label: "Button",
    className: "btn btn-accent btn-sm text-primary-content",
  },
};
