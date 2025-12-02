# Library Management System (Backend)

Backend capstone project for a Library Management System built with 
**Node.js**, 
**TypeScript**, 
**Express**, 
**Firebase (Auth + Firestore)**, 
**Joi** for validation, 
**Morgan** for logging, 
**Swagger** for API documentation.

---
### Prerequisites

* Node.js installed
* Firebase project created (Firestore & Auth enabled)
* Service Account key JSON downloaded

##  Goals & Scope 

# Manage **books** (CRUD operations)
* Manage **borrow** (borrow / return)
* Authentication with Firebase Auth 
* Authorization with roles: "ADMIN", "LIBRARIAN", "MEMBER"
* Schema validation with Joi**
* API docs with **Swagger UI**

---

##  Tech Stack with course content alignment

* **Runtime**: Node.js (LTS), TypeScript
* **Framework**: Express
* **Database**: Firebase Firestore
* **Auth**: Firebase Auth
* **Validation**: Joi
* **Logging**: Morgan
* **Docs**: swagger ui

---

##  Data Model (Firestore)

* users

  * "displayName: string"
  * "email: string"
  * "role: "ADMIN" | "LIBRARIAN" | "MEMBER"`

* books

  * title, 
  * author,
  * Available,
  * updatedEdition

* borrow

  * bookId, 
  * userId, 
  * status: "BORROWED" | "RETURNED",
  * returnDAte

# Routes

### "/books"

* "GET/" — list
* "GET/:id" — get book
* "POST/" — **LIBRARIAN | ADMIN** create
* "PUT/:id" — **LIBRARIAN | ADMIN** update
* "DELETE/:id" — **ADMIN** delete

### "/borrow"

* "GET/" — : list
* "POST/borrow" — "{ bookId }"
* "POST /return" — "{ borrowId }"

---

## GitHub Project Setup

* Branch model: main , development, feature.
* Milestones:
* M1: Project setup
* M2: Project demo
* M3: Project completion
* M4: Final demonstration
* Issues: Issues will be created .
* CI: linting workflows would be added (.github/workflows/linting) .




** How To Run This Project: **

1. First Clone the Repo

git clone (https://github.com/Navkaran7007/library-management-system)

2. Install the dependecies

npm install

3. Start the Server

npm start

4. Api Will Be working at:

http://localhost:3000


5. Swagger Docs is avaliable at this url:

http://localhost:3000/api-docs

** Documentation is also available on github pages.

6. Firebase is used in this project
  To Setup:
  -Create Project
  -Go to "Project Settings"
  -Navigate to "Service Accounts"
  -Click "Generate new private key"
  -Download the JSON file
  -Put this file in Config

