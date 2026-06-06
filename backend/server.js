const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const PORT = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KariyerAI API',
      version: '1.0.0',
      description: 'KariyerAI Backend API - Betul Auth modulu dahil',
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
=======
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'KariyerAI API', version: '1.0.0', description: 'KariyerAI Backend API Dokumantasyonu' },
    servers: [{ url: 'http://localhost:3000' }],
>>>>>>> origin/main
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.json({ message: 'KariyerAI Backend calisiyor!' });
});

<<<<<<< HEAD
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));
app.use('/api/users', require('./src/routes/userRoutes'));
app.use('/api/jobs', require('./src/routes/jobRoutes'));
app.use('/api/applications', require('./src/routes/applicationRoutes'));
app.use('/api/ai', require('./src/routes/aiRoutes'));

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda calisiyor...`);
  console.log(`Swagger: http://localhost:${PORT}/api-docs`);
=======
const applicationRoutes = require('./src/routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const aiRoutes = require('./src/routes/aiRoutes');
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server ' + PORT + ' portunda calisiyor...');
  console.log('Swagger: http://localhost:' + PORT + '/api-docs');
>>>>>>> origin/main
});
