import React, { useEffect } from "react";
import DoctorCard from "../../components/DoctorCard";
import { useHospital } from "../../context/HospitalContext";
import withModal from "../../components/shared/withModal";
import { Container, Row, Col } from "react-bootstrap";
import DetailModal from "../../components/DetailModal";
import { Profiler } from "react";

const DoctorCardWithModal = withModal(DoctorCard, DetailModal);
const Team = () => {
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
          <h1 className="my-4">Lista de Doctores</h1>
    
          {/* Integración del Profiler aquí */}
          <Profiler id="doctor-list" onRender={handleRender}>
            {doctors.length > 0 ? (
              <Row>
                {doctors.map((doctor) => (
                  <Col key={doctor.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    {/* Usamos el componente envuelto con HOC */}
                    <DoctorCardWithModal doctor={doctor} data={doctor} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No hay doctores disponibles.</p>
            )}
          </Profiler>
        </Container>
      );
}

export default Team