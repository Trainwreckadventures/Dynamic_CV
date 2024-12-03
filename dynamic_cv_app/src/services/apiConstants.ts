const urlKey: string = process.env.REACT_APP_API_KEY as string;

const serviceUrl: string = "https://crudcrud.com/api/";

export const catchUrl: string = `${serviceUrl}${urlKey}`;
