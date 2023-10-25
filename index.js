const express = require('express');
const connection = require('./database/mongodb');
const userRoutes = require('./routes/routes');
const app = express();
const cors = require('cors');

// Configura CORS para permitir solicitudes desde http://localhost:4200
app.use(cors({
  origin: 'https://magenta-snickerdoodle-9a0af1.netlify.app/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita el envío de cookies u otras credenciales
}));

app.use(express.json());

app.use('/', userRoutes);

connection();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
