import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MedicationModal from './modal'; // Asegúrate de que la ruta de importación es correcta

const Tabla = () => {
  const [medications, setMedications] = useState([]);

  const addMedication = (medication) => {
    setMedications([...medications, {...medication, taken: false, singleDose: false, assignedTable: determineTable(medication) }]);
  };

  const handleCheckboxChange = (medicationIndex, checkboxName) => {
    let updatedMedications = medications.map((medication, index) => {
      if (index === medicationIndex) {
        const updatedMedication = { ...medication, [checkboxName]: !medication[checkboxName] };
        updatedMedication.assignedTable = determineTable(updatedMedication);
        return updatedMedication;
      }
      return medication;
    });
    setMedications(updatedMedications);
  };
  
  const determineTable = (medication) => {
    if (medication.singleDose) {
      return "Only When";
    }
    const hour = parseInt(medication.nextDose.split(':')[0]);
    if (hour >= 6 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Noon";
    } else if (hour >= 18 && hour < 23) {
      return "Evening";
    } else {
      return "Night";
    }
  };




  const createRowForTimeOfDay = (timeOfDay, color) => {
    const medsForTime = medications.filter(med => med.assignedTable === timeOfDay);
    return medsForTime.map((med, index) => (
      <tr key={index} style={{ backgroundColor: color }}>
        <td>{med.name}</td>
        <td>{med.dose}</td>
        <td>{med.interval}</td>
        <td>{med.days}</td>
        <td>{med.takenTime}</td>
        <td>{med.nextDose}</td>
        <td>
          <Button className="btn btn-primary">Terminado</Button>
        </td>
      </tr>
    ));
  };
  
  
  

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2 style={{ color: 'green', textAlign: 'center' }}>Medicamentos Pendientes</h2>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <MedicationModal addMedication={addMedication} />
        </Col>
      </Row>

      <Row className="justify-content-md-center mt-4">
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Medicamento</th>
                <th>Dosis</th>
                <th>Intervalo de Horas</th>
                <th>Días de Tratamiento</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => (
                <tr key={index}>
                  <td>{medication.name}</td>
                  <td>{medication.dose}</td>
                  <td>{medication.interval}</td>
                  <td>{medication.days}</td>
                  <td>
                    <Form.Check 
                      type="checkbox" 
                      label="Tomado" 
                      checked={medication.taken}
                      onChange={() => handleCheckboxChange(index, 'taken')} 
                    />
                    <Form.Check 
                      type="checkbox" 
                      label="Única Dosis" 
                      checked={medication.singleDose}
                      onChange={() => handleCheckboxChange(index, 'singleDose')} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <h1 style={{ color: 'green', textAlign: 'center' }}>Horario de Medicamentos</h1>
      
      {/* Tabla con encabezado */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Horario del Día</th>
            <th>Medicamentos</th>
            <th>Dosis</th>
            <th>Intervalo de Horas</th>
            <th>Días de Tratamiento</th>
            <th>Hora Tomada</th>
            <th>Próxima Dosis Programada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {createRowForTimeOfDay("Morning", "#f73c3c")}
          {createRowForTimeOfDay("Noon", "#effd2b")}
          {createRowForTimeOfDay("Evening", "#32f5b4")}
          {createRowForTimeOfDay("Night", "#4129d9")}
          {createRowForTimeOfDay("Only When", "#3cad3a")}
        </tbody>
      </Table>

      </Row>
    </Container>
  );
}

export default Tabla;
