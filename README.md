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

This will run `docker compose up -d --no-recreate && docker compose start` for running  [MongoDb](#mongodb) in container and the server on `http://localhost:8000`. The server will automatically restart when changes are detected in the project files.
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

### Mongodb

This project uses MongoDB as a database. We use [Mongoose](https://mongoosejs.com/) as an ODM for MongoDB.

#### local development
For local development we use a MongoDB Docker container. The following command will start the MongoDB container manually:

```bash
docker compose up -d
```
or you can run the project, and it will be up if it didn't exist.
```bash
npm run dev 
```
Container uses named `Volume` for data persistence.

Connection params are read from the `.env` file.

###### Mongo Express
Is a user a web-based MongoDB admin interface that will be available on `http://localhost:8081` after running the project for development.

#### Production

For production, we use MongoDB Atlas. Connection params are read from the `.env.production` file.

## S3 Bucket Usage

This project uses AWS S3 for storing and managing images associated with products. Below are the details on how S3 is integrated and used within the project.

### Configuration

The S3 bucket configuration parameters are stored in the `.env` file. Ensure the following environment variables are set:

```dotenv
AWS_ACCESS_KEY_ID= # AWS access key ID
AWS_SECRET_ACCESS_KEY= # AWS secret access key
AWS_REGION= # AWS region, e.g., eu-central-1
AWS_BUCKET_NAME= # AWS S3 bucket name
```

### S3 Client Setup

The S3 client is set up using the AWS SDK for JavaScript. The client is configured with the credentials and region specified in the environment variables. Buckets are created manually in aws management console.

### Updating Images in S3
#### When the product is updated/deleted images stored in AWS S3 are reviewed and updated/deleted accordingly.

1. **Upload New Image**:
    - Upload the new image to the S3 bucket using the AWS SDK.
    - Ensure the new image is stored with a unique key (file name).

2. **Update Database Record**:
    - Update the database record to reference the new image key.
    - If the old image key is no longer needed, mark it for deletion.

3. **Delete Old Image (Optional)**:
    - If the old image is no longer needed, delete it from the S3 bucket to free up space.

### Deleting Images from S3

1. **Identify Images to Delete**:
    - Retrieve the keys of the images that need to be deleted from the database or other sources.

2. **Delete Images from S3**:
    - Use the AWS SDK to send a delete request for each image key to the S3 bucket.
    - Ensure that the delete operation is successful by checking the response status.

3. **Update Database Record**:
    - Remove the references to the deleted image keys from the database.
    - Ensure the database record is consistent and does not reference any deleted images.


## Environments

Backend App exists in 3 environments: `development`, `staging` and `production`.
Each of them connects to corresponding MongoDB database and AWS S3 bucket.

- **Development environment** is used for local development. 

      DB: local MongoDB run with Docker container

      S3 bucket: S3 bucket with name `jam-ecommerce-image-bucket` for storing images.

- **Staging environment** is used for testing. 

      DB: MongoDB Atlas Org Name: "ecommerce-pet-project" Project name:"ecommerce" cluster0: dajd3ob

      S3 bucket: S3 bucket with name `staging-jam-ecommerce-image-bucket` for storing images.

- **Production environment** is used for Production. 

      DB: MongoDB Atlas Org Name: "ecommerce-pet-project" Project name:"ecommerce-prod" cluster0: vpdx96f

      S3 bucket: S3 bucket with name `prod-jam-ecommerce-image-bucket` for storing images.

### Deployments and Pipelines

- **Local development** connects to  `development` environment. 
- **Heroku Review Apps** connect to `staging` environment, created for every new PR is destroyed after 2 days of inactivity.
- **Heroku Staging environment** connects to `staging` environment has latest `main` branch deployed. 
- **Heroku Production environment** connects to `production` environment has latest `main` branch deployed. 
