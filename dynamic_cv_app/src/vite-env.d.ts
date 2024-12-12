/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Declaring the specific environment variable here:
  readonly VITE_API_KEY: string;
}
// Extend the ImportMeta interface to include the env content:
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
//This ensures type-safe access to environment variables in a Vite project using TypeScript
