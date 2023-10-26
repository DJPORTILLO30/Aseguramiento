// auth.js
const jwt = require('jsonwebtoken');

function validarToken(req, res, next) {
    const token = req.headers.authorization;
  
    try {
      // Verificar si el token existe
      if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
      }
  
      // Verificar y decodificar el token
      const decodedToken = jwt.verify(token, process.env.claveSecreta);
  
      // Agregar el usuario decodificado al objeto de solicitud para usarlo en las rutas protegidas
      req.usuario = decodedToken;
  
      // Asignar el userId al objeto req
      req.userId = decodedToken.userId;
  
      // Continuar con la siguiente función 
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }
}

module.exports = validarToken;
