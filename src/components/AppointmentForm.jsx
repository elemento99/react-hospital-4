import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHospital } from '../context/HospitalContext';
import supabase from '../supabase/client';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const AppointmentForm = () => {
  const {
    services,
    doctors,
    doctorServices,
    fetchServices,
    fetchDoctors,
    fetchDoctorServices
  } = useHospital();
  
  // Crear referencia para el campo de nombre completo
  const nameInputRef = useRef(null);

  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetchServices();
    fetchDoctors();
    fetchDoctorServices();
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const filterDoctorsByServices = () => {
    if (!selectedService) {
      setFilteredDoctors([]);
      return;
    }

    const doctorIdsWithSelectedService = doctorServices
      .filter((doctorService) => doctorService.service_id === selectedService)
      .map((doctorService) => doctorService.doctor_id);

    const result = doctors.filter((doctor) =>
      doctorIdsWithSelectedService.includes(doctor.id)
    );

    setFilteredDoctors(result);
  };

  useEffect(() => {
    filterDoctorsByServices();
  }, [selectedService, doctorServices]);

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
  };

  const handleName = (e) => {
    setSelectedName(e.target.value);
  };

  const handleDate = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga del formulario

    // Validar los campos
    if (!selectedDoctor || !selectedName || !selectedService || !selectedDate) {
      console.error('Todos los campos deben estar llenos');
      if (nameInputRef.current) {
        // Si hay un error, enfocamos el campo de nombre
        nameInputRef.current.focus();
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          doctor_id: selectedDoctor,
          patient_name: selectedName,
          service_id: selectedService,
          appointment_date: selectedDate
        });

      if (error) throw error;

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    } catch (error) {
      console.error(error.message || 'An unknown error occurred');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="fullName">Nombre completo</Form.Label>
            <Form.Control
              id="fullName"
              ref={nameInputRef} // Usamos la referencia aquí
              value={selectedName}
              onChange={handleName}
              placeholder="Escriba su nombre completo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="service">Servicio</Form.Label>
            <Form.Select
              id="service"
              value={selectedService}
              onChange={handleServiceChange}
            >
              <option value="">Seleccione un servicio</option>
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="doctor">Doctor</Form.Label>
            <Form.Select
              id="doctor"
              value={selectedDoctor}
              onChange={handleDoctorChange}
              disabled={!selectedService || filteredDoctors.length === 0}
            >
              <option value="">Seleccione un doctor</option>
              {filteredDoctors.map((doctor) => (
                <option value={doctor.id} key={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="schedule">Horario</Form.Label>
            <Form.Control
              type="datetime-local"
              id="schedule"
              placeholder="Seleccione la fecha y hora"
              value={selectedDate}
              onChange={handleDate}
            />
          </Form.Group>

          <Button type="submit">Enviar</Button>
        </fieldset>
      </Form>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showMessage} onClose={() => setShowMessage(false)}>
          <Toast.Header>
            <strong className="me-auto">Cita Agendada</strong>
            <small>Ahora</small>
          </Toast.Header>
          <Toast.Body>¡Cita agendada exitosamente!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default AppointmentForm;
