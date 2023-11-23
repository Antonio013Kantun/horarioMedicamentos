const connection = require("../database");

const obtenerUsuarios = (req, res) => {
  connection.query("SELECT * FROM usuario", (error, results) => {
    if (error) {
      console.error("Error al obtener usuarios", error);
      res.status(500).json({
        error: "Error al obtener usuarios",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("SELECT * FROM usuario WHERE id_usuario =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al obtener el usuario"});
    } else if(results.length === 0){
      res.status(500).json({error:"El usuario no fue encontrado"});
    } else {
      res.json(results[0]);
    }
  });
};


const crearUsuario = (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  // Verificar que se proporcionen nombre, correo y contraseña
  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Nombre, correo o contraseña faltante' });
  }

  // Almacenar el nombre de usuario, correo y contraseña en la base de datos sin encriptación
  connection.query(
    'INSERT INTO usuario (nombre, correo, contrasena) VALUES (?,?,?)',
    [nombre, correo, contrasena],
    (error, results) => {
      if (error) {
        console.error('Error al agregar usuario', error);
        return res.status(500).json({ error: 'Error al agregar usuario' });
      }

      res.json({ message: 'Usuario agregado correctamente' });
    }
  );
};


const actualizarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  const { nombre, correo, contrasena } = req.body;
  connection.query(
    "UPDATE usuario SET nombre=?, correo=?, contrasena=? WHERE id_usuario=?",
    [nombre, correo, contrasena, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar usuario", error);
        res.status(500).json({error: "Error al actualizar usuario"});
      } else {
        res.json({message: "Usuario actualizado correctamente"});
      }
    }
  );
};

const eliminarUsuarioPorId = (req, res) => {
  const id = req.params.id_usuario;
  connection.query("DELETE FROM usuario WHERE id_usuario=?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al eliminar el usuario"});
    } else {
      res.json({message: "Usuario eliminado correctamente"});
    }
  });
};



const login = (req, res) => {
  const { correo, contrasena } = req.body;
  const sql = 'SELECT id_usuario FROM usuario WHERE correo = ? AND contrasena = ?';

  connection.query(sql, [correo, contrasena], (error, results) => {
    if (error) {
      console.error(error);
      return res.json({ error: 'Error en la consulta' });
    }

    if (results.length === 1) {
      const idUsuario = results[0].id_usuario; // Obtiene el idUsuario de la consulta

      return res.json({ mensaje: 'Autenticación exitosa', idUsuario });
    } else {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
};





module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuarioPorId,
  eliminarUsuarioPorId,
  login,
};
