import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  // Estados para almacenar los valores de los inputs
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    try {
      const response = await axios.post('http://localhost:3001/usuarios/login', {
        correo,
        contrasena,
      });
      console.log(response.data);
      alert('Autenticación exitosa');
      // Aquí puedes redirigir al usuario o manejar el estado de la sesión como prefieras
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
