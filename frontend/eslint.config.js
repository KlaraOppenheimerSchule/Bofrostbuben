import { defineConfig } from "eslint/config";
import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default defineConfig([
  // Vue + TypeScript config
  {
    files: ["**/*.vue", "**/*.ts", "**/*.js"],
    languageOptions: {
      parser: vueParser, // must be the vue-eslint-parser module
      parserOptions: {
        parser: tsParser, // nested TS parser for <script lang="ts">
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"], // allow TS parser to see .vue SFCs
      },
    },
    plugins: {
      vue: vuePlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // your rules here
    },
  },
]);
