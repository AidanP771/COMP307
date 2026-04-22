const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path')
const { connectDB, getDB, closeDB } = require('./db');
const userRoutes = require('./routes/userroutes');
const slotRoutes = require('./routes/slotroutes');
const bookingRoutes = require('./routes/bookingroutes');
const authRoutes = require('./routes/authroutes');
const proposalRoutes = require('./routes/proposalroutes');
const meetingRoutes = require('./routes/meetingroutes')

// ================== App Config =======================

const hostname = process.env.HOST || '0.0.0.0';
const port = Number(process.env.PORT || 5000);
const publicBaseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${port}`;
const app = express();
let server;
let shuttingDown = false;

app.use(express.json());

app.use('/user', userRoutes);
app.use('/slot', slotRoutes);
app.use('/booking', bookingRoutes);
app.use('/auth', authRoutes);
app.use('/proposal', proposalRoutes);
app.use('/meeting', meetingRoutes);


// ================== Swagger Config =======================
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking App',
      version: '1.0.0',
      description: '307 final project',
    },
  },
  apis: [
    path.join(__dirname, 'server.js'), 
    path.join(__dirname, 'routes', '*.js')
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ================== Test =======================

app.get('/api/test', (req, res) => {
  res.json({ message: 'test works' });
});

app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const db = getDB();

      const result = await db.collection('users').insertOne({ name, email, password });

      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

// ================== Main =======================

async function startServer() {
  await connectDB();

  server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
    console.log(`Server bound at http://${hostname}:${port}/`);
    console.log(`Public base URL: ${publicBaseUrl}`);
    console.log(`Docs available at ${publicBaseUrl}/api-docs`);
  });

}

startServer();

async function gracefulShutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`Received ${signal}. Shutting down gracefully...`);

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((err) => (err ? reject(err) : resolve()));
      });
    }
    await closeDB();
    console.log('Shutdown complete.');
    process.exit(0);
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exit(1);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
