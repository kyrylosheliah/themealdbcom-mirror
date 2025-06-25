import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";
import eslintPluginNext from "@eslintPluginNext";

const eslintConfig = [
  {
    ignores: [
      "eslint.config.mjs",
      "postcss.config.mjs",
      ".next/**",
      "node_modules/**",
      ".env*",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  eslintPluginNext,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default eslintConfig;
