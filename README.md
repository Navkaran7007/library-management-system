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