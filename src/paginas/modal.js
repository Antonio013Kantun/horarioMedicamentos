import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MedicationModal = ({ addMedication }) => {
  const [show, setShow] = useState(false);
  const [medication, setMedication] = useState({
    name: '',
    dose: '',
    interval: '',
    days: '',
    status: 'Pendiente'
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setMedication({ ...medication, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    addMedication(medication);
    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Añadir Medicamento
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Medicamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Nombre del Medicamento</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="dose">
              <Form.Label>Dosis</Form.Label>
              <Form.Control type="number" placeholder="Ingrese la dosis" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="interval">
              <Form.Label>Intervalo de Horas</Form.Label>
              <Form.Control type="number" placeholder="Ingrese el intervalo en horas" onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="days">
              <Form.Label>Días de Tratamiento</Form.Label>
              <Form.Control type="number" placeholder="Ingrese los días de tratamiento" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar medicamento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MedicationModal;
