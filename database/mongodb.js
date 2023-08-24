const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Conexión a la base de datos exitosa :D');
})
.catch(err => {
    console.error('Error al conectarse a la base de datos D:  :', err);
});

module.exports = mongoose;