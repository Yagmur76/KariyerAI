const swaggerJsdoc = require('swagger-jsdoc');

const options = {
definition: {
openapi: '3.0.0',


info: {
  title: 'KariyerAI API',
  version: '1.0.0',
  description: 'KariyerAI backend API documentation',
},

servers: [
  {
    url: 'http://localhost:3000',
  },
],

components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},

security: [
  {
    bearerAuth: [],
  },
],


},

apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
