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
        { name: "Light", dataTheme: "light", color: "#ffffff" },
        { name: "Dark", dataTheme: "dark", color: "#1f2937" },
        { name: "Cupcake", dataTheme: "cupcake", color: "#fae8e0" },
        { name: "Bumblebee", dataTheme: "bumblebee", color: "#fbd665" },
        { name: "Emerald", dataTheme: "emerald", color: "#10b981" },
        { name: "Corporate", dataTheme: "corporate", color: "#4b6bfb" },
        { name: "Synthwave", dataTheme: "synthwave", color: "#e779c1" },
        { name: "Retro", dataTheme: "retro", color: "#ef9995" },
        { name: "Cyberpunk", dataTheme: "cyberpunk", color: "#ff7598" },
        { name: "Valentine", dataTheme: "valentine", color: "#e96d7b" },
        { name: "Halloween", dataTheme: "halloween", color: "#f28c18" },
        { name: "Garden", dataTheme: "garden", color: "#5c7f67" },
        { name: "Forest", dataTheme: "forest", color: "#1eb854" },
        { name: "Aqua", dataTheme: "aqua", color: "#09ecf3" },
        { name: "Lofi", dataTheme: "lofi", color: "#808080" },
        { name: "Pastel", dataTheme: "pastel", color: "#d1c1d7" },
        { name: "Fantasy", dataTheme: "fantasy", color: "#f9f8ff" },
        { name: "Wireframe", dataTheme: "wireframe", color: "#b8b8b8" },
        { name: "Black", dataTheme: "black", color: "#000000" },
        { name: "Luxury", dataTheme: "luxury", color: "#a09078" },
        { name: "Dracula", dataTheme: "dracula", color: "#ff79c6" },
        { name: "CMYK", dataTheme: "cmyk", color: "#00aaff" },
        { name: "Autumn", dataTheme: "autumn", color: "#8c0327" },
        { name: "Business", dataTheme: "business", color: "#1c4e80" },
        { name: "Acid", dataTheme: "acid", color: "#affc41" },
        { name: "Lemonade", dataTheme: "lemonade", color: "#f4f4f4" },
        { name: "Night", dataTheme: "night", color: "#1a1c22" },
        { name: "Coffee", dataTheme: "coffee", color: "#120c02" },
        { name: "Winter", dataTheme: "winter", color: "#4d7c7c" },
        { name: "Dim", dataTheme: "dim", color: "#252525" },
        { name: "Nord", dataTheme: "nord", color: "#4c566a" },
        { name: "Sunset", dataTheme: "sunset", color: "#ff5e57" },
      ],
    },
  },
};

export default preview;
