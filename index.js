const express = require('express');
const connection = require('./database/mongodb');
const userRoutes = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(express.json());


app.use('/api', userRoutes);


app.use(cors());


app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});