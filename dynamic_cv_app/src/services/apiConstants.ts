// Base URL for external API (crudcrud):
const serviceUrl: string = "https://crudcrud.com/api/";
// Importing key from env here:
export const apiKey: string = import.meta.env.VITE_API_KEY;
// completing by combining the service URL and API key here:
export const catchUrl: string = `${serviceUrl}${apiKey}`;
