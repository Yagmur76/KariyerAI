const applicationRoutes = require('./routes/applicationRoutes');
const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('API çalışıyor');
});

app.listen(3000, () => {
  console.log('Sunucu çalışıyor: http://localhost:3000');
});