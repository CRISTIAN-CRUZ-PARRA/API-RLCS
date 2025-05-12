# Setting up a `json-server` for Client-Side Projects

This document explains how to create a repository with a simulated data server using [`json-server`](https://github.com/typicode/json-server). This tool allows us to simulate a full REST API without having to program any backend. It is ideal for client-side projects like those developed during the **Client-Side Development (DAW)** module.

## 0️⃣ Create the Repository on GitHub

1. Go to [https://github.com](https://github.com) and create a new repository with the name:

```
11_client-side_final-project_backend
```

2. DO NOT initialize the repository with any files (`README`, `.gitignore`, etc.).

## 🛠️ Steps to Set Up the Project

### 1. Initialize the Project Locally

```bash
mkdir 11_client-side_final-project_backend
cd 11_client-side_final-project_backend
npm init -y

# git init
```

### 2. Install the `json-server` Dependency

```bash
npm install json-server --save-exact
```

instalame esta version
npm install json-server@0.17.3


### 3. Create the `index.js` File

To ensure the server works correctly on services like `render`, you need to define an `index.js` file to initialize the server. Create an `index.js` file with the following content:

```js
// index.js
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
```

### 4. Create the `db.json` File

This file contains the initial data for the "database" in JSON format. Basic example:

```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Study json-server",
      "completed": false
    },
    {
      "id": 2,
      "title": "Complete the client-side project",
      "completed": true
    }
  ]
}
```

You can create as many resources as you want (`users`, `notes`, `posts`, etc.) with a similar structure.

### 5. Define Scripts in `package.json`

Edit the `package.json` file to add the following scripts:

```json
"scripts": {
  "dev": "json-server --watch db.json --port 3000",
  "start": "node index.js"
}
```

#### 🔍 What Does Each Script Do?

- `dev`: Used locally. Starts the server at `localhost:3000` using `json-server` directly.
- `start`: Used in production environments. Runs the `index.js` file to start the server.

## ▶️ Starting the Server

### Locally:

```bash
npm run dev
```

You can access the simulated API at:

```
http://localhost:3000/tasks
```

## 🔄 Available CRUD Operations

With `json-server`, you automatically have support for these routes:

- `GET /tasks` → List of tasks
- `GET /tasks/1` → A specific task
- `POST /tasks` → Create a new task
- `PUT /tasks/1` → Update a task
- `DELETE /tasks/1` → Delete a task

## 🚀 Preparing for Deployment

To ensure your client application can consume data in production, it is important that this server is also deployed.

Once properly configured:

- The server will be automatically deployed when you push to the main branch.
- The service (Render, Railway, etc.) will use the `start` script.

To allow your SPA to consume data in production, this server must be accessible online. Below are the steps to deploy it easily on [Render](https://render.com), a free service with support for Node.js applications.

### 🌐 Steps to Deploy on Render

1. Go to [https://render.com](https://render.com) and create an account (or log in).
2. Click **"New" > "Web Service"**.
3. Connect your GitHub account and select the `11_client-side_final-project_backend` repository.
4. Fill out the form with the following configuration and click **"Deploy Web Service"** once completed.

| Field          | Value                                            |
| -------------- | ------------------------------------------------ |
| Name           | 11_client-side_final-project_backend             |
| Language       | Node                                             |
| Region         | Europe (if available)                            |
| Branch         | `main`                                           |
| Build Command  | `npm install`                                    |
| Start Command  | `npm start`                                      |
| Root Directory | _(leave empty if `package.json` is in the root)_ |

### 🟢 Once Deployed...

Render will run `npm install` and execute `npm start`, which is:

```bash
json-server --watch db.json --port $PORT
```

Render will automatically assign a port and expose the API at a URL like this:

```
https://11_client-side_final-project_backend.onrender.com/tasks


https://one1-client-side-final-project-backend-8zfh.onrender.com
```

## 🧭 Final Notes

Students can deploy the server wherever they see fit (Railway, Cyclic, etc.), as long as:

- It is **accessible from the Internet**.
- It remains persistently available throughout the project's lifecycle.