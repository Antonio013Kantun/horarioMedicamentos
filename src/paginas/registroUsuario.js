import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistroUsuario() {
  // Estados para almacenar los valores de los inputs
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const response = await axios.post('http://localhost:3001/usuarios/', {
        nombre,
        correo,
        contrasena,
      });
      console.log(response.data);
      alert('Usuario registrado con éxito');
    } catch (error) {
      console.error('Hubo un error al registrar el usuario:', error);
      alert('Error al registrar el usuario');
    }
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center">
          <h1 className="Registrate">Regístrate</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" required
                      value={nombre} onChange={e => setNombre(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" id="email" required
                      value={correo} onChange={e => setCorreo(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" required
                      value={contrasena} onChange={e => setContrasena(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistroUsuario;
