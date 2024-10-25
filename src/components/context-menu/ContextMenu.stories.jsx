import React from "react";
import { action } from "@storybook/addon-actions";
import { ContextMenu } from "./ContextMenu";

export default {
  title: "Example/ContextMenu",
  component: ContextMenu,
  args: {
    stickyHeader: false,
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  argTypes: {
    menu: {
      description: "The menu component to be displayed on right-click",
    },
    children: {
      description: "The content wrapped by ContextMenu that triggers the menu on right-click",
    },
  },
};

// Define a custom menu component to pass as the menu prop
const CustomMenu = () => (
  <ul className="menu bg-base-200 w-56 p-0 [&_li>*]:rounded-none">
    <li onClick={action("Item 1 clicked")}><a>Item 1</a></li>
    <li onClick={action("Item 2 clicked")}><a>Item 2</a></li>
    <li onClick={action("Item 3 clicked")}><a>Item 3</a></li>
  </ul>
);

// Template to render ContextMenu in stories
const BaseTemplate = ({ children, menu }) => {
  return <ContextMenu menu={menu}>{children}</ContextMenu>;
};

export const Default = {
  render: (args) => <BaseTemplate {...args} />,
  args: {
    menu: <CustomMenu />,
    children: (
      <div className="p-4 h-80 w-80 bg-base-300 rounded">
        <span className=" text-xs">right click anywhere in this div</span>
      </div>
    ),
  },
};
