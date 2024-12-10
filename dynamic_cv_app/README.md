# Dynamic CV

**Eksamensoppgave i emne 6**  
"Oppgaven går ut på å utvikle en webapplikasjon som lar brukere opprette, redigere, og tilpasse CV-er direkte gjennom et dynamisk skjema."

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Built With](#built-with)
3. [Getting Started](#getting-started)
4. [Features](#features)
   - [Non-registered Users](#non-registered-users)
   - [Registered Users](#registered-users)
   - [Admin Features](#admin-features)
5. [Reflection Notes](#reflection-notes)
6. [Challenges & Work in Progress](#challenges--work-in-progress)
7. [Sources](#sources)

---

## Project Overview

This is a **Dynamic CV App** built using **React**, **TypeScript**, and **Redux Toolkit** for dynamically generating and managing resumes.

📌 You can see how I planned and executed the project here:  
[Planning Board on Miro](https://miro.com/app/board/uXjVPNX8E7w=/?share_link_id=278666658249)

I spent considerable time mulling over the folder structure, distinguishing "need-to-have" versus "nice-to-have" features, creating a schedule to work within the project timeframe, and organizing resources. I am proud of the planning that went into this project.

---

## Built With

- **React** (v18.3.1)
- **TypeScript** (v5.6.2)
- **Redux Toolkit** (v2.4.0)
- **Vite** (v6.0.1)
- **jsPDF** for PDF generation

---

## Getting Started

### Prerequisites

- **Node.js** (v14.x or higher)
- **npm**

### Steps to Run the Project

1. Clone the repository:
   git clone https://github.com/Trainwreckadventures/Dynamic_CV.git

after cloning the repo, you'll have to navigate to the right folder in the terminal:
cd .\dynamic_cv_app\

Getting started:
Prerequisites

Node.js (v14.x or higher)
npm

use
npm run dev
when you want to start the local host

## API Information

I have stored the API key in the `.env` file, but as a backup, I am leaving the details here in the README.  
**Note:** This is not best practice, but since this project uses `crudcrud` (a temporary API), it is shared here for your convenience.

- **Base API**: `https://crudcrud.com/api/bb3bb53686a241c19ccc49dfa7dde3cd`
- **Users Endpoint**: `https://crudcrud.com/api/bb3bb53686a241c19ccc49dfa7dde3cd/users`
- **CVs Endpoint**: `https://crudcrud.com/api/bb3bb53686a241c19ccc49dfa7dde3cd/cvs` (here you can see what I mean by a lot of metadata in the picture part of the cv).

To view anything at all you have to log in, you can either pic from existing test users I have provided or try creating your very own.
Here are some of the pre existing ones:

## Pre-existing User Credentials

### Admin Access

- **Email**: `admin@example.com`
- **Password**: `adminbruker`

### User with CV (and picture)

- **Email**: `alfredeplesaus@example.com`
- **Password**: `123password`

### User without CV (to create one)

- **Email**: `omnissiah@lovesme.com`
- **Password**: `onesandzeroes`

## Features

### Non-registered Users

- **Registration**:  
  As a non-registered user, you must register first via the login page. Simply click the blue "Sign Up" link and provide your name, email, and password.
  - Default role is set to **user**.
- **Access and Management**:  
  Once registered, you can view and edit your profile information or delete your user account.
  - **Create CV**: Navigate to the "Create CV" page. Upon creation, it will be added to the API and displayed on the CV page.
  - **Edit/Delete**: Modify your CV, add/remove information, or delete it entirely.
  - **Print as PDF**: Print the CV using the "Print" button.

### Registered Users

- **Login**:  
  Login using your registered email and password.
  - Access your user profile and CV if it exists or create a new one.
  - Update the CV with additional details or delete it.
  - View the CV in expanded mode by clicking your name and collapse it by clicking again.
  - Print the CV as a PDF and log out via the logout button.

### Admin Features

- **User Management**:  
  Admins can view, edit, or delete all users in the system via the "Users" page.
- **CV Management**:  
  Admins can edit or delete CVs created by any user.
- **Own CV**:  
  Admins can create, update, or delete their own CV as well.

## Things I Am Still Working On

- **Role Assignment**: I'd like admin to be able to alter the role from user to admin.
- **Picture Metadata**: The pictures get stored with a lot of metadata to crudcrud, I am trying to figure out how to make it so less string get's sendt (but it hasn't been a fruitfull hunt yet).
- **Authentication Security**: I'd like to add json web token, salt and bcrypt to this project. I am unsure how this will work with crudcrud.
  (I have made it so you can not access the same things when you log in, but I have not set up protective routes because I wanted to keep the layout simple). -**Testing**: I have yet to do testing on my app, but I am hoping to be able to before hand in! -**Unexpected behaviour**: If you delete a user, their CV should probably be deleted to. Still working it out.

---

## Reflection Notes

I think I still have a long way to go before I can create good modular code, I often prefer to separate logic a little, but not to much.
With the edit logic it seemed like the best idea to keep it separate from the CV list because it was a lot of text. But I often prefer to keep a lot of code in the same place without refracturing to much. I think I do this because I am a newbie, so I get very attatched to code that works. I have a hard time starting over or "killing my darlings" even if it would make the overall quality of the project better. Sometimes I'll ask chat gpt if I am following best practice just for me to get upset and blatantly ignore the answer if the suggestion is to split up code to make it more buildable. I think with more knowledge, practice and confidence that this will evolve in a positive trajectory in the future. But for now I prefer the way I code because it feels confortable.

---

## Sources

- **ChatGPT**: For explanations and debugging:
  - Helped simplify explanations about Redux Toolkit, `.env` file usage, and PDF generation in React.
  - Suggested using a `types.ts` file for TypeScript, which saved me a lot of trouble.
- **Stack Overflow**:
  - [Styling with jsPDF](https://stackoverflow.com/questions/20460035/jspdf-cant-get-any-styling-to-work): Provided guidance on how to write logic for PDFs.
