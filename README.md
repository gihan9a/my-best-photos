# My Best Photos

This app shows your uploaded photos and allows to select best 9 photos.  

Once you've selected the photos it will show the photos in the order of your selection.  

You can change your selection and using "Change selection" button.

## Getting Started - Developer

The application contains `api-server` and `client` components.

### API Server

API Server is a Express application bootstrapped with `express-generator` tool. API Server component located inside `/server` directory.

### Start the API Server

1. Update environment variables  
   Rename `/server/example.env` file as `/server/.env`. Then update the variables inside the `/server/.env` as appropriately.
2. Start the server  
   Go to the `/server` directory and run following command from your terminal.
   `npm run dev`

#### Testing

To run tests suits  
`npm run test`  

To run in watch mode  
`npm run test:watch`
  
Lint testing for styles  
`npm run test:eslint`


**IMPORTANT**
> To reset the selected best photos please execute the following api request.
> 
> `curl -X DELETE http://localhost:4000/photos`

#### Stack

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Jest](https://jestjs.io/)


### Client

Client is a React application bootstrapped with `create-react-app` tool. Client component located inside `/client` directory.

### Start Client

1. Update environment variables  
   Rename `/client/example.env` file as `/client/.env`. Then update the variables inside the `/client/.env` as appropriately
2. Start the server  
   Go to the `client` directory and run following command from your terminal.  
   `npm run start`

#### Testing

To run test suits  
1. Start the API server ([see](#start-the-api-server)) and frontend server ([see](#start-client))  
2. Open cypress test runner
`npm run test:cypress`
3. Click `Run {x} integration spec` button on the right side.

To run eslint for styles  
`npm run test:eslint`
 
#### Stack

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [dnd kit](https://dndkit.com/)
- [Cypress](https://www.cypress.io/)

## Deploying to production without Docker

Update the environment variables on both `/server/.env` and `/client/.env` files.

1. Start the `api-server`  
   `npm run start`
2. Build production optimized version of client  
   Go to `/client` directory from your terminal and run following command.  
   `npm run build`
3. Start the server.  
   `npm run start`

The client should be running on http://localhost:3000 and server should be running on http://localhost:4000

## Docker

Build docker images using `docker-compose`:  
`docker-compose build`

This command will build the docker images from the instructions found on `/client/Dockerfile` and `/server/Dockerfile` files.

Start the containers:  
`docker-compose up -d`

The client should be running on http://localhost:3000 and server should be running on http://localhost:4000