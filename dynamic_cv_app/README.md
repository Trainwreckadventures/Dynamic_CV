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
5. [Things I Am Still Working On](#Things-I-Am-Still-Working-On)
6. [Reflection Notes](#reflection-notes)
7. [Sources](#sources)

---

## Project Overview

This is a **Dynamic CV App** built using **React**, **TypeScript**, and **Redux Toolkit** for dynamically generating and managing resumes.

📌 You can see how I planned and executed the project here:  
[Eksamen Rammeverk](https://miro.com/app/board/uXjVPNX8E7w=/?share_link_id=278666658249)

I spent considerable time mulling over the folder structure, distinguishing "need-to-have" versus "nice-to-have" features, creating a schedule to work within the project timeframe, and organizing resources. I am proud of the planning that went into this project.

---

## Built With

- **React** (v18.3.1)
- **TypeScript** (v5.6.2)
- **Redux Toolkit** (v2.4.0)
- **Vite** (v6.0.1)
- **jsPDF** for PDF generation

Why I chose typescript:
I wanted to get more hands on experience with something else than JSX, I was looking for a chalenge and how it might work compared to what I was already used to. I enjoy it because of how perticular it is, I apreciate that TSX always need to know what the types are/the strict typing (I can relate to that on a personal level). It did however feel more complicated than what I am used to, but I am sure that I will understand more when I experiment mre with it, I am already planning my next project.

Why I chose Redux Toolkit:
I thought it sounded really interesting, and during the demo it appeared to make the project easier. It gives you a lot "for free" and makes tasks more manageable. I can't help but view it as "dark magic" because of what's going on behind the scenes with the store.

I added RTK query to this project as well, I think it added to the usabiliy and coding experience, and I think it works well with Redux toolkit. It saved me a lot of time since I needed fewer slices and files to make the project work.

---

## Getting Started

### Prerequisites

- **Node.js**
- **npm**

### Steps to Run the Project

1. Clone the repository:
   git clone https://github.com/Trainwreckadventures/Dynamic_CV.git

after cloning the repo, you'll have to navigate to the right folder in the terminal:
cd .\dynamic_cv_app\

Getting started:

Prerequisites

Node.js
npm

use:
npm install
npm run dev

## API Information

I have used: https://crudcrud.com/

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
  **Do not delete admin**
  (since the default role is user, please do not delete admin from the app).

### User with CV (and picture)

- **Email**: `alfredeplesaus@example.com`
- **Password**: `123password`
  **Do not delete Alfred**
  (he's my favourite, please do not delete my boy).

### User without CV (to create one)

- **Email**: `omnissiah@lovesme.com`
- **Password**: `onesandzeroes`

## Features

### Non-registered Users

- **Registration**:  
  As a non-registered user, you must register first via the login page. Simply click the blue "Sign Up" link and provide the name, email, and password that you want.
  (NB: this is not a "safe app" so please do not use a private email or password!)
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
- **Picture Metadata**: The pictures get stored with a lot of metadata to crudcrud, I think I counted nearly 80 lines just for that bulbasaur picture (and since I can't access my creative cloud/photoshop I can't alter it myself either). There must be a better way to deal with that!
- **Authentication Security**: I'd like to add json web token, salt and bcrypt to this project. I am unsure how this will work with crudcrud.
  (I have made it so you can not access the same things when you log in, but I have not set up protective routes because I wanted to keep the layout simple). -**Testing**: I have not yet been able to fully implement Jest or React DevTools testing with my app. I remain committed to learning, though I suspect I’ll need to explore plenty of tutorials during the holidays, as testing has proven to be a challenging.

  -**Unexpected behaviour**: If you delete a user, their CV should probably be deleted to.

  (it might also be slightly annoying for admin/user that they can't click the create CV page if have a CV in the API).

---

## Reflection Notes

At first I didn't want to put comments in my code, I wanted to keep it as clean as possible. After thinking about it I came to the conclution that it can't hurt to add it.

I think I still have a long way to go before I can create good modular code, I often prefer to separate logic a little, but not to much.
With the edit logic it seemed like the best idea to keep it separate from the CV list because it was a lot of text. But I often prefer to keep a lot of code in the same place without refracturing to much. I think I do this because I am a newbie, so I get very attatched to code that works. I have a hard time starting over or "killing my darlings" even if it would make the overall quality of the project better. Sometimes I'll ask chat gpt if I am following "best practice" just for me to get upset and blatantly ignore the advice if the suggestion is to split up code to make it more buildable. I think with more knowledge, practice and confidence that this will evolve in a positive trajectory in the future (I also think seeing more real life examples from real life people could help). But for now I prefer the way I code because it feels confortable, I am however willing to grow and learn.

I’m sure there are still some bugs I haven’t discovered, especially since I didn’t fully master the testing part of the project. I had a bit of an ego hit there, but I’m glad I gave it a try. If it weren’t for my "day of unsuccessfull" testing, I might not have realized I could accidentally add the same email multiple times. Even though I didn’t completely grasp testing, these little insights turned out to be valuable. Sometimes, happy little accidents happen.

I’ve realized that if you want to integrate testing effectively, it’s important to:
a) Ensure the testing tools are compatible with your project, and
b) Start testing early on. Testing a little at a time makes the process feel much more manageable. If I did that, I think it would have been more manageable.

At least I know where I need to put more of my focus.

I can also add that I struggled a lot with the CSS, I know it's not part of this exam, but for the overall look and to add user-friendliness I believe it to still hold value for my exam. I am happy I got to dust off the CSS skills and re-awaken them abit (but here I also need more practice).

All in all I am content with the outcome and how much I have learnt during this project.

## Sources

- **Redux Dev**: https://redux-toolkit.js.org/tutorials/rtk-query
- **Github** https://github.com/dawood11/React-oppgaver/tree/master/Demo%20kode%202024 : helpfull practice and demos from the semester.
- **ChatGPT**: For explanations and debugging:
  - Helped simplify explanations about Redux Toolkit, `.env` file usage, and PDF generation in React.
  - Suggested using a `types.ts` file for TypeScript, which saved me a lot of trouble.
- **Stack Overflow**:
  - [Styling with jsPDF](https://stackoverflow.com/questions/20460035/jspdf-cant-get-any-styling-to-work): Provided guidance on how to write logic for PDFs.- - -
