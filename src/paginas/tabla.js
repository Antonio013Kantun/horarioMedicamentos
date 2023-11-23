import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MedicationModal from './modal'; // Asegúrate de que la ruta de importación es correcta

const Tabla = () => {
  const [medications, setMedications] = useState([]);
  const [takenMedications, setTakenMedications] = useState([]); 



  const addMedication = (medication) => {
    setMedications([...medications, {...medication, taken: false, singleDose: false, takenTime: '', nextDoseTime: ''}]);
  };

  const handleCheckboxChange = (medicationIndex, checkboxName) => {
    let updatedMedications = [...medications];
    let medication = updatedMedications[medicationIndex];
    const currentTime = new Date();

    medication[checkboxName] = !medication[checkboxName];

    if (checkboxName === 'singleDose' && medication.singleDose) {
      medication.taken = true;
      medication.takenTime = currentTime.toLocaleTimeString();
    } else if (checkboxName === 'taken' && medication.taken) {
      medication.takenTime = currentTime.toLocaleTimeString();
      medication.nextDoseTime = new Date(currentTime.getTime() + medication.interval * 60 * 1000).toLocaleTimeString();
    }

    medication.assignedTable = determineTable(medication);

    if (medication.taken) {
      setTakenMedications([...takenMedications, medication]);
      updatedMedications.splice(medicationIndex, 1);
    }

    setMedications(updatedMedications);
  };


  const handleTerminadoClick = (medicationIndex) => {
    const updatedTakenMedications = [...takenMedications];
    let medication = updatedTakenMedications[medicationIndex];
    const currentTime = new Date();

    medication.takenTime = currentTime.toLocaleTimeString();
    medication.nextDoseTime = new Date(currentTime.getTime() + medication.interval * 60 * 1000).toLocaleTimeString();
    medication.assignedTable = determineTable(medication);

    setTakenMedications(updatedTakenMedications);
  };


  const createRowForTimeOfDay = (timeOfDay, color) => {
    const medsForTime = takenMedications.filter(med => med.assignedTable === timeOfDay);

    if (medsForTime.length === 0) {
      return (
        <tr style={{ backgroundColor: color }}>
          <td>{timeOfDay}</td>
          <td colSpan="6">No hay medicamentos</td>
          <td></td>
        </tr>
      );
    }

    return medsForTime.map((med, index) => (
      <tr key={index} style={{ backgroundColor: color }}>
        <td>{timeOfDay}</td>
        <td>{med.name}</td>
        <td>{med.dose}</td>
        <td>{med.interval}</td>
        <td>{med.days}</td>
        <td>{med.takenTime}</td>
        <td>{med.nextDoseTime}</td>
        <td>
          <Button className="btn btn-primary">Terminado</Button>
        </td>
      </tr>
    ));
  };

  const determineTable = (medication) => {
    const minutes = new Date().getMinutes();
    if (medication.singleDose) {
      return "Only When";
    } else if (minutes >= 0 && minutes < 15) {
      return "Morning";
    } else if (minutes >= 15 && minutes < 30) {
      return "Noon";
    } else if (minutes >= 30 && minutes < 45) {
      return "Evening";
    } else {
      return "Night";
    }
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
