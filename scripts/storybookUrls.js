import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storybookStaticDir = path.resolve(__dirname, "../storybook-static");
const indexPath = path.join(storybookStaticDir, "index.html");
const baseUrl = "http://localhost:6006"; // or the URL your Storybook is served from

if (fs.existsSync(indexPath)) {
  const indexHtml = fs.readFileSync(indexPath, "utf8");
  const storyRegex = /<a href="\/(.*?)"/g;
  const storyUrls = [];
  let match;

  while ((match = storyRegex.exec(indexHtml)) !== null) {
    storyUrls.push(`${baseUrl}/${match[1]}`);
  }

  fs.writeFileSync("storybook-urls.txt", storyUrls.join("\n"));
  console.log("Storybook URLs saved to storybook-urls.txt");
} else {
  console.error("Storybook index.html not found!");
  process.exit(1);
}
