import React, { useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import MedicationModal from './modal'; // Asegúrate de que la ruta de importación es correcta
import './tabla.css'
import Navbar from './navbar'

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
      // Cambiar minutos por horas aquí
      medication.nextDoseTime = new Date(currentTime.getTime() + medication.interval * 3600000).toLocaleTimeString();
    }
  
    medication.assignedTable = determineTable(medication);
  
    if (medication.taken) {
      setTakenMedications([...takenMedications, medication]);
      updatedMedications.splice(medicationIndex, 1);
    }
  
    setMedications(updatedMedications);
  };
  


  const handleTerminadoClick = (medicationIndex) => {
    let updatedTakenMedications = [...takenMedications];
    let medication = updatedTakenMedications[medicationIndex];
    const currentTime = new Date();
  
    if (medication) {
      medication.takenTime = currentTime.toLocaleTimeString();
      medication.nextDoseTime = new Date(currentTime.getTime() + medication.interval * 3600000).toLocaleTimeString();
  
      const nextDoseTime = new Date(currentTime.getTime() + medication.interval * 3600000);
      const newAssignedTable = determineTableByTime(nextDoseTime);
  
      if (medication.assignedTable === newAssignedTable) {
        // Si la próxima dosis es en el mismo tiempo del día, simplemente actualiza la información
        updatedTakenMedications[medicationIndex] = medication;
        setTakenMedications(updatedTakenMedications);
      } else {
        // Si la próxima dosis es en un tiempo del día diferente, mueve el medicamento
        medication.assignedTable = newAssignedTable;
        updatedTakenMedications.splice(medicationIndex, 1); // Remueve de takenMedications
        setTakenMedications(updatedTakenMedications);
        setMedications([...medications, medication]); // Añade a medications
      }
    }
  };
  
  const handleTerminadoUpdated = (medicationIndex) => {
    let updatedTakenMedications = [...takenMedications];
    let medication = updatedTakenMedications[medicationIndex];
    const currentTime = new Date();
  
    if (medication) {
      for (let i = medication.remainingDoses; i > 0; i--) {
        // Actualizar la hora tomada y calcular la próxima dosis
        medication.takenTime = currentTime.toLocaleTimeString();
        medication.nextDoseTime = new Date(currentTime.getTime() + medication.interval * 3600000).toLocaleTimeString();
  
        // Determinar a qué segmento del día pertenece la próxima dosis
        medication.assignedTable = determineTableByTime(medication.nextDoseTime);
  
        // Decrementar el contador de dosis restantes
        medication.remainingDoses--;
  
        // Simplemente actualizar la información en takenMedications
        updatedTakenMedications[medicationIndex] = medication;
        setTakenMedications(updatedTakenMedications);
  
        // Romper el bucle si ya no quedan dosis
        if (medication.remainingDoses === 0) break;
      }
    }
  };
  
  function determineTableByTime(nextDoseTime) {
    const hour = parseInt(nextDoseTime.split(':')[0]);
    switch (true) {
      case (hour >= 6 && hour < 12):
        return 'morning';
      case (hour >= 12 && hour < 18):
        return 'noon';
      case (hour >= 18 && hour < 23):
        return 'evening';
      default:
        return 'night';
    }
  }
  
  
  

  
  const isTimeInCurrentTableRange = (time, currentTable) => {
    const hours = time.getHours();
    switch(currentTable) {
      case "Morning":
        return hours >= 6 && hours < 12;
      case "Noon":
        return hours >= 12 && hours < 18;
      case "Evening":
        return hours >= 18 && hours < 24;
      case "Night":
        return hours < 6 || hours >= 24;
      default:
        return false;
    }
  };
  
  const timeOfDayImages = {
    'Morning': 'https://img.icons8.com/ios/50/000000/sun--v1.png',
    'Noon': 'https://img.icons8.com/pulsar-line/48/000000/midday.png', // URL de ejemplo para el mediodía
    'Evening': 'https://img.icons8.com/pastel-glyph/64/000000/sunset--v2.png',
    'Night': 'https://img.icons8.com/external-those-icons-lineal-those-icons/48/external-night-weather-those-icons-lineal-those-icons.png',
    'Only': 'https://img.icons8.com/external-tal-revivo-light-tal-revivo/96/external-general-over-the-counter-medicine-isolated-on-a-white-background-drugs-light-tal-revivo.png'
  };
  
  
  
  const createRowForTimeOfDay = (timeOfDay) => {
    const medsForTime = takenMedications.filter(med => med.assignedTable === timeOfDay);
    const colorClass = `${timeOfDay.toLowerCase()}-color`; // Convierte a minúsculas y agrega '-color'
    const timeOfDayImage = timeOfDayImages[timeOfDay];
  
    if (medsForTime.length === 0) {
      return (
        <tr className={colorClass}>
          <td>
            <img width="48" height="48" src={timeOfDayImage} alt={timeOfDay} />
            {timeOfDay}
          </td>
          <td colSpan="6">No hay medicamentos</td>
          <td></td>
        </tr>
      );
    }
  
    return medsForTime.map((med, index) => (
      <tr key={index} className={colorClass}>
        <td>
          <img width="48" height="48" src={timeOfDayImage} alt={timeOfDay} />
          {timeOfDay}
        </td>
        <td>{med.name}</td>
        <td>{med.dose}</td>
        <td>{med.interval}</td>
        <td>{med.days}</td>
        <td>{med.takenTime}</td>
        <td>{med.nextDoseTime}</td>
        <td>
          <Button 
            className="btn btn-primary"
            onClick={() => handleTerminadoUpdated(index)}
          >
            Terminado
          </Button>
        </td>
      </tr>
    ));
  };
  

   
  // const determineTableByTime = (nextDoseTime) => {
  //   const doseTime = new Date(nextDoseTime);
  //   const hours = doseTime.getHours();
  
  //   if (hours >= 6 && hours < 12) {
  //     return "Morning";
  //   } else if (hours >= 12 && hours < 18) {
  //     return "Noon";
  //   } else if (hours >= 18 && hours < 24) {
  //     return "Evening";
  //   } else {
  //     return "Night";
  //   }
  // };
  
  

  const determineTable = (medication) => {
    const hours = new Date().getHours();
    if (medication.singleDose) {
      return "Only";
    } else if (hours >= 6 && hours < 12) {
      return "Morning";
    } else if (hours >= 12 && hours < 18) {
      return "Noon";
    } else if (hours >= 18 && hours < 24) {
      return "Evening";
    } else {
      return "Night";
    }
  };
  

  const determineColor = (timeOfDay) => {
    switch (timeOfDay) {
      case 'Morning':
        return '#f73c3c'; // Rojo
      case 'Noon':
        return '#effd2b'; // Amarillo
      case 'Evening':
        return '#32f5b4'; // Verde claro
      case 'Night':
        return '#4129d9'; // Azul
      case 'Only':
        return '#3cad3a'; // Verde oscuro
      default:
        return 'white';
    }
  };
  

  return (
    <>
    <Navbar></Navbar>
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

      <Table striped bordered hover className="horario-medicamentos">
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
          {['Morning', 'Noon', 'Evening', 'Night', 'Only'].map((timeOfDay) => (
            createRowForTimeOfDay(timeOfDay, determineColor(timeOfDay))
          ))}
        </tbody>
      </Table>
      </Row>
    </Container>
    </>
    
  );
}

export default Tabla;


