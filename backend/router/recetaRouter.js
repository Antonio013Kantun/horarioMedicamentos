const express = require("express");
const recetaControllers = require("../controllers/recetaControllers");  // Asegúrate de tener el controlador de usuarios adecuado
const cors = require("cors");


const router = express.Router();

router.use(cors());
router.use(express.json());

// agregar receta
router.post("/:id", recetaControllers.agregarMedicamento);


// Ruta para obtener medicamentos de un usuario
router.get("/:id", recetaControllers.obtenerMedicamentosPorUsuario);

// Ruta para actualizar un medicamento
router.put("/:id", recetaControllers.actualizarMedicamento);

module.exports = router;