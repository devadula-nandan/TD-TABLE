import "../src/index.css"; // Path to your Tailwind CSS

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
export const globalTypes = {
  dataThemes: {
    defaultValue: {
      list: [
        { name: "Light", dataTheme: "light", color: "#ffffff" }, // Base color from Light theme
        { name: "Dark", dataTheme: "dark", color: "#1f2937" }, // Base color from Dark theme
        { name: "Cupcake", dataTheme: "cupcake", color: "#fae8e0" }, // Base color from Cupcake theme
        { name: "Bumblebee", dataTheme: "bumblebee", color: "#fbd665" }, // Base color from Bumblebee theme
        { name: "Emerald", dataTheme: "emerald", color: "#10b981" }, // Base color from Emerald theme
        { name: "Corporate", dataTheme: "corporate", color: "#4b6bfb" }, // Base color from Corporate theme
        { name: "Synthwave", dataTheme: "synthwave", color: "#e779c1" }, // Base color from Synthwave theme
        { name: "Retro", dataTheme: "retro", color: "#ef9995" }, // Base color from Retro theme
        { name: "Cyberpunk", dataTheme: "cyberpunk", color: "#ff7598" }, // Base color from Cyberpunk theme
        { name: "Valentine", dataTheme: "valentine", color: "#e96d7b" }, // Base color from Valentine theme
        { name: "Halloween", dataTheme: "halloween", color: "#f28c18" }, // Base color from Halloween theme
        { name: "Garden", dataTheme: "garden", color: "#5c7f67" }, // Base color from Garden theme
        { name: "Forest", dataTheme: "forest", color: "#1eb854" }, // Base color from Forest theme
        { name: "Aqua", dataTheme: "aqua", color: "#09ecf3" }, // Base color from Aqua theme
        { name: "Lofi", dataTheme: "lofi", color: "#808080" }, // Base color from Lofi theme
        { name: "Pastel", dataTheme: "pastel", color: "#d1c1d7" }, // Base color from Pastel theme
        { name: "Fantasy", dataTheme: "fantasy", color: "#f9f8ff" }, // Base color from Fantasy theme
        { name: "Wireframe", dataTheme: "wireframe", color: "#b8b8b8" }, // Base color from Wireframe theme
        { name: "Black", dataTheme: "black", color: "#000000" }, // Base color from Black theme
        { name: "Luxury", dataTheme: "luxury", color: "#a09078" }, // Base color from Luxury theme
        { name: "Dracula", dataTheme: "dracula", color: "#ff79c6" }, // Base color from Dracula theme
        { name: "CMYK", dataTheme: "cmyk", color: "#00aaff" }, // Base color from CMYK theme
        { name: "Autumn", dataTheme: "autumn", color: "#8c0327" }, // Base color from Autumn theme
        { name: "Business", dataTheme: "business", color: "#1c4e80" }, // Base color from Business theme
        { name: "Acid", dataTheme: "acid", color: "#affc41" }, // Base color from Acid theme
        { name: "Lemonade", dataTheme: "lemonade", color: "#f4f4f4" }, // Base color from Lemonade theme
        { name: "Night", dataTheme: "night", color: "#1a1c22" }, // Base color from Night theme
        { name: "Coffee", dataTheme: "coffee", color: "#120c02" }, // Base color from Coffee theme
        { name: "Winter", dataTheme: "winter", color: "#4d7c7c" }, // Base color from Winter theme
        { name: "Dim", dataTheme: "dim", color: "#252525" }, // Base color from Dim theme
        { name: "Nord", dataTheme: "nord", color: "#4c566a" }, // Base color from Nord theme
        { name: "Sunset", dataTheme: "sunset", color: "#ff5e57" }, // Base color from Sunset theme
      ],
    },
  },
};

export default preview;
