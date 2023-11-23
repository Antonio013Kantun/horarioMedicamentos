const connection = require("../database");


const agregarMedicamento = (req, res) => {
  const idUsuario = req.params.id;
  const {
    id_receta,
    nombreMedicamento,
    dosis,
    intervalo,
    tomado,
    horaDeToma,
    horaSigToma,
  } = req.body;

  const sql = 'INSERT INTO receta (id_receta, nombreMedicamento, dosis, intervalo, tomado, horaDeToma, horaSigToma, id_usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id_receta, nombreMedicamento, dosis, intervalo, tomado, horaDeToma, horaSigToma, idUsuario];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error al agregar medicamento:', error);
      return res.status(500).json({ error: 'Error al agregar medicamento' });
    }

    return res.status(201).json({ mensaje: 'Medicamento agregado correctamente' });
  });
};


const obtenerMedicamentosPorUsuario = (req, res) => {
  const idUsuario = req.params.id;
  const sql = 'SELECT * FROM receta WHERE id_usuario_id = ?';
  connection.query(sql, [idUsuario], (error, results) => {
    if (error) {
      console.error('Error al obtener medicamentos', error);
      res.status(500).json({ error: 'Error al obtener medicamentos' });
    } else {
      res.json(results);
    }
  });
};

const actualizarMedicamento = (req, res) => {
  const idMedicamento = req.params.id;
  const { tomado, horaDeToma, horaSigToma } = req.body;

  const sql = 'UPDATE receta SET tomado = ?, horaDeToma = ?, horaSigToma = ? WHERE id = ?';
  connection.query(sql, [tomado, horaDeToma, horaSigToma, idMedicamento], (error, results) => {
    if (error) {
      console.error('Error al actualizar medicamento', error);
      res.status(500).json({ error: 'Error al actualizar medicamento' });
    } else {
      res.json({ mensaje: 'Medicamento actualizado correctamente' });
    }
  });
};




module.exports = {
  agregarMedicamento,
  obtenerMedicamentosPorUsuario,
  actualizarMedicamento,
  // Otros métodos exportados
};