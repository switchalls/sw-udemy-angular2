# Google firebase

## Create project

Goto [firebase.google.com](https://console.firebase.google.com/)

![Step 1](images/firebase-create-project-1.png)
![Step 2](images/firebase-create-project-2.png)
![Step 3](images/firebase-create-project-3.png)

## Create realtime database

![Create database](images/firebase-create-realtime-database-1.png)

Your target endpoint will be displayed in the confirmation dialog, eg.

![Service endpoint](images/firebase-create-realtime-database-2.png)

## Setup firebase authentication

* Restrict database access
  
  Change rules to use `auth != null`, eg.

![change rules](images/firebase-change-database-access-rules.png)

* Enable email/password based authentication

![Enable authentication](images/firebase-enable-authentication.png)

* Use [authentication API](https://firebase.google.com/docs/reference/rest/auth) to sign-up and login users
