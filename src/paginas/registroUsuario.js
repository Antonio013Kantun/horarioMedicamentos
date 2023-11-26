import React, { useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./registroUsuario.css";

function RegistroUsuario() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal
  const [modalContent, setModalContent] = useState(""); // Contenido del modal

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/usuarios/", {
        nombre,
        correo,
        contrasena,
      });
      console.log(response.data);
      setModalContent("Usuario registrado con éxito");
      setShowModal(true);
    } catch (error) {
      console.error("Hubo un error al registrar el usuario:", error);
      setModalContent("Error al registrar el usuario");
      setShowModal(true);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://cdn.pixabay.com/photo/2016/02/07/16/35/world-1185076_1280.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Asegura que el fondo cubra toda la altura visible
        }}
      >
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
                      <label htmlFor="name" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Correo Electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Registrar
                    </button>
                  </form>
                  <div className="mt-3">
                    <p>
                      ¿Ya tienes una cuenta?{" "}
                      <Link to="/">Inicie sesión aquí</Link>
                    </p>
                  </div>
                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Mensaje</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalContent}</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistroUsuario;
