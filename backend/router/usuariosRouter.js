const express = require("express");
const usuariosControllers = require("../controllers/usuariosControllers");  // Asegúrate de tener el controlador de usuarios adecuado
const cors = require("cors");


const router = express.Router();

router.use(cors());
router.use(express.json());

// Obtener todos los usuarios
router.get("/", usuariosControllers.obtenerUsuarios);

// Obtener un usuario por ID
router.get("/:id_usuario", usuariosControllers.obtenerUsuarioPorId);

// Crear un nuevo usuario
router.post("/", usuariosControllers.crearUsuario);

// Actualizar un usuario por ID
router.put("/:id_usuario", usuariosControllers.actualizarUsuarioPorId);

// Eliminar un usuario por ID
router.delete("/:id_usuario", usuariosControllers.eliminarUsuarioPorId);

// Puedes agregar otras rutas o acciones según tus necesidades

// Ruta para iniciar sesión

// router.post("/login", usuariosControllers.iniciarSesion);

router.post("/login", usuariosControllers.login);

module.exports = router;
