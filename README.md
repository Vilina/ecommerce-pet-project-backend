## Description

This is an Express.js API for an e-commerce application. The API provides endpoints for managing products, orders, and users.

## Installation

To get this project running on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the project's dependencies.

## Usage

### Development Server
For development, you can start the development server by running the following command:

```bash
npm run dev
```

This will start the server on `http://localhost:8000`. The server will automatically restart when changes are detected in the project files.
For that the project uses [Nodemon](#nodemon) package.

### Typescript

This project is written in TypeScript. Node.js does not support TypeScript out of the box.

- ##### TS in development
For **development**, since we use [Nodemon](#nodemon) to watch for file changes and restart the server, 
we use ts-node to run the TypeScript code directly without the need to compile it to JavaScript.

- ##### TS in production
For **production**, we compile the TypeScript code to JavaScript and run the JavaScript code using `TypeScript compiler` and then running js code.
For that run the following command:

```bash
npm start
```

We use `tsc` command which is a TypeScript compiler that reads the `tsconfig.json` file and compiles TypeScript code to JavaScript.

To compile the TypeScript code to JavaScript manually, run the following command:

```bash
tsc
```
 
### Nodemon

In this project, we use [Nodemon package](https://www.npmjs.com/package/nodemon) for auto-restarting the node application when file
changes in the directory are detected. Nodemon is a replacement wrapper for Node, to use `nodemon` 
replace the word `node` on the command line when executing your script.

It's a devDependency in the project. The following script will start the application with Nodemon:

```bash
npm run dev 
```
