import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "warn",
      "semi": ["error", "always"],
      "eqeqeq": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },
]);
