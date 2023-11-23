// import express from "express";
// import mysql from "mysql";
// import cors from 'cors';

// const app = express();

// app.use(express.json());
// app.use(cors());

// const conexion = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'appmedicamento'
// });

// conexion.connect(function (error) {
//     if (error) {
//         console.log("Error al conectar la base de datos");
//     } else {
//         console.log('Conexión exitosa');
//     }
// });

// app.get('/obtenerNombreMedicamentos', (peticion, respuesta) => {
//     const sql = "SELECT nombre FROM medicamentos";
//     conexion.query(sql, (error, resultado) => {
//         if (error) return respuesta.json({ error: "Error en la consulta" });
//         const nombres = resultado.map((row) => row.nombre);
//         return respuesta.json({ nombresMedicamentos: nombres });
//     });
// });
// app.post('/registrarUsuario', (req, res) => {
//     const { full_name, email, password } = req.body;
//     const sql = 'INSERT INTO usuarios (full_name, email, password) VALUES (?, ?, ?)';
//     conexion.query(sql, [full_name, email, password], (error, resultado) => {
//       if (error) {
//         console.error(error);
//         return res.json({ error: 'Error al registrar el usuario' });
//       }
//       return res.json({ mensaje: 'Usuario registrado con éxito' });
//     });
//   });

  
//   app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const sql = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
  
//     conexion.query(sql, [email, password], (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.json({ error: 'Error en la consulta' });
//       }
  
//       if (results.length === 1) {
//         return res.json({ mensaje: 'Autenticación exitosa' });
//       } else {
//         return res.status(401).json({ error: 'Credenciales incorrectas' });
//       }
//     });
//   });
  
  

// app.listen(8083, () => {
//     console.log('Servidor en el puerto 8083');
// });