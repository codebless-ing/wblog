import globals from "globals";
import pluginJs from "@eslint/js";

export default [
    { ignores: ["**/*.spec.js", "coverage/*", "**/*.mock.js"] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    {
        rules: {
            "no-console": "warn"
        },
    },
];
