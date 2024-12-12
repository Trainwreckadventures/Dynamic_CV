/// <reference types="react-scripts" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Making sure the API key is recognized as a required string:
      REACT_APP_API_KEY: string;
    }
  }
}
//This setup adds TypeScript support for process.env variables
