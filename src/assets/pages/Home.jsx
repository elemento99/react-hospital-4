import React, { useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import { useHospital } from "../../context/HospitalContext";
import ServiceList from "../../components/ServiceList";
import AppointmentForm from "../../components/AppointmentForm";
import { Container, Row, Col } from "react-bootstrap";
import withModal from "../../components/shared/withModal";
import DetailModal from "../../components/DetailModal";
import { Profiler } from "react";



const Home = () => {
  const handleRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log("Renderizado de", id);
    console.log("Fase:", phase);
    console.log("Duración actual:", actualDuration);
    console.log("Duración base:", baseDuration);
    console.log("Tiempo de inicio:", startTime);
    console.log("Tiempo de commit:", commitTime);
  };

  const { doctors, services, error, fetchDoctors, loading } = useHospital();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  if (loading) {
    return <p>Cargando información...</p>;
  }

  return (
    <Container>
      <ServiceList services={services} />

    </Container>
  );
};

export default Home;
