//Here I am defining the user:
export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
//And here I am defining the cv
export interface CV {
  _id: string;
  user: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    photo?: string;
  };
  skills: string[];
  experience: { title: string; company: string; years: string }[];
  education: { degree: string; institution: string; year: string }[];
  references: { name: string; contactInfo: string }[];
}
