const express = require('express');
const dbConnection = require('./config/config');
const postsRoutes = require('./routes/posts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(express.json());
app.use('/', postsRoutes); 

// Solo iniciar el servidor si no estamos en modo de prueba
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app; // Exportar app para Supertest
