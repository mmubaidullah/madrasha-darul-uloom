import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // Disable some rules for development
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "warn",
      
      // Custom rules
      "no-console": "warn",
      "no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error",
      
      // React specific
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      
      // Import rules
      "import/no-anonymous-default-export": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores
    "node_modules/**",
    "dist/**",
    "coverage/**",
    ".env*",
    "*.config.js",
    "*.config.mjs",
  ]),
]);

export default eslintConfig;
