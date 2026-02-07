# AI Agent Code Generator

This project creates an AI Agent Code Generator. It has a backend server, a frontend interface, and a sandbox environment to test the generated codes. 

## Project Structure

```
AiAgent-Code-Generator/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── README.md
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   └── apiController.js
│   ├── models/
│   │   └── user.js
│   ├── routes/
│   │   └── apiRoutes.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── components/
│   │       └── CodeEditor.js
│   └── package.json
└── sandbox/
    ├── runner.js
    └── package.json
```