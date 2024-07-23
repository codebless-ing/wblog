import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {ignores: ["**/*.spec.js", "coverage/*"]},
  {languageOptions: { globals: { ...globals.browser, ...globals.node  }}},
  pluginJs.configs.recommended,
];