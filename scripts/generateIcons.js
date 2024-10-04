import { readFile, writeFile } from "node:fs/promises";
import fs from "node:fs";
import { getIconsCSS } from "@iconify/utils";
import { locate } from "@iconify/json";

/**
 * List of icons. Key is icon set prefix, value is array of icons
 *
 * @type {Record<string, string[]>}
 */
import icons from "../src/resources/assets/icons.json" with { type: "json" };

const outputDir = "./public/css";

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log("--[generateIcons] CSS folder created. \n");

// Parse each icon set
let code = "";
for (const prefix in icons) {
    // Find location of .json file
    const filename = locate(prefix);

    // Load file and parse it
    /** @type {import("@iconify/types").IconifyJSON} */
    const iconSet = JSON.parse(await readFile(filename, "utf8"));

    // Get CSS
    const css = getIconsCSS(iconSet, icons[prefix], {
        iconSelector: ".icon-{name}",
        commonSelector: "",
    });

    // Add it to code
    code += css;
}

// Save CSS file
await writeFile(`${outputDir}/icons.css`, code, "utf8");
console.log(`--[generateIcons] Saved CSS (${code.length} bytes)\n`);
