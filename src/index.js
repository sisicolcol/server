const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const compression = require('compression');

const app = express();
const Router = require('./routers/index.js');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = require('../swagger/swaggerDoc');
const swaggerSpec = swaggerJsDoc(options);
const swaggerFile = require("./swagger-output");

const { SERVER_HOST, SERVER_PORT } = process.env;

const server = () => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(compression());

    app.use('/api', Router());
    app.use(
        "/swagger",
        swaggerUi.serve,
        swaggerUi.setup(swaggerFile),
        express.json()
    );

    app.listen(SERVER_PORT, () => {
        console.log(`GridgeTestServer is now listening to http://${SERVER_HOST}:${SERVER_PORT}`);
    });
    
};

try {
    server(SERVER_PORT);
} catch (e) {
    console.log(e);
}