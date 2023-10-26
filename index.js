const express = require('express');
const connection = require('./database/mongodb');
const userRoutes = require('./routes/routes');
const app = express();
const cors = require('cors');


app.use(cors({
  origin: 'https://davinderpro01.github.io/MyTask',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilita el envío de cookies u otras credenciales
}));

app.use(express.json());



connection();

app.use('/', userRoutes);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
