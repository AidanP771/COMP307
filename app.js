const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// ================== App Config =======================

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

// ================== Swagger Config =======================
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
  },
  apis: ['app.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// =========================================

/**
 * @swagger
 * /:
 *  get:
 *      summary: Returns a test message
 *      responses:
 *          200:
 *          description: Successful response
 */
app.get('/', (req, res) => {
    res.send('Hello World TEST');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Docs available at http://${hostname}:${port}/api-docs`);
});