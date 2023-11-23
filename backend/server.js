// const express = require('express');
// const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
// const connection = require("./database");

// const app = express();
// const port = 3001; // o el puerto que desees
// app.use(bodyParser.json());


// // Ruta de inicio de sesión
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Consultar el usuario en la base de datos
//   connection.query('SELECT * FROM usuario WHERE correo = ?', [email], async (error, results) => {
//     if (error) {
//       console.error('Error al buscar usuario en la base de datos:', error);
//       return res.status(500).json({ error: 'Error interno del servidor' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Usuario no encontrado' });
//     }

//     const user = results[0];

//     // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
//     const match = await bcrypt.compare(password, user.contrasena);

//     if (!match) {
//       return res.status(401).json({ error: 'Contraseña incorrecta' });
//     }

//     // En este punto, la autenticación es exitosa
//     res.json({ message: 'Inicio de sesión exitoso' });
//   });
// });

// app.listen(port, () => {
//   console.log(`Servidor corriendo en http://localhost:${port}`);
// });
