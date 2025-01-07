import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Profiler } from "react";
import { useHospital } from "../../context/HospitalContext";

const ServiceList = ({ services }) => {
  return (
    <Row>
      {services.map((service, index) => (
        <Col md={6} lg={4} className="mb-4" key={index}>
          <Card>
            <Card.Img
              variant="top"
              src={service.image || "https://via.placeholder.com/300x200"}
              alt={service.name}
            />
            <Card.Body>
              <Card.Title>{service.name}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const Home = () => {
  const handleRender = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.log("Renderizado de:", id);
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
      <Row>
        {/* Contenido principal: Lista de servicios */}
        <Col md={8}>
          <Profiler id="ServiceList" onRender={handleRender}>
            <h2>Nuestros Servicios</h2>
            <ServiceList services={services} />
          </Profiler>
        </Col>

        {/* Información del hospital en un aside */}
        <Col md={4}>
          <Profiler id="HospitalInfo" onRender={handleRender}>
            <aside className="hospital-info">
              {/* Información del hospital */}
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Bienvenido al Hospital</Card.Title>
                  <Card.Text>
                    Nuestro hospital está dedicado a brindar atención médica de alta calidad.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Historia</Card.Title>
                  <Card.Text>
                    Fundado en 1990, nuestro hospital ha sido un pilar de la comunidad.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Misión</Card.Title>
                  <Card.Text>
                    Brindar atención médica integral con profesionalismo y empatía.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Visión</Card.Title>
                  <Card.Text>
                    Ser reconocidos como líderes en innovación y calidad médica.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Ubicación</Card.Title>
                  <Card.Text>
                    Avenida Principal 123, Ciudad Salud, País
                  </Card.Text>
                  <iframe
                    title="Mapa del Hospital"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093895!2d144.95373521590476!3d-37.81627974202113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1611814568172!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Contacto</Card.Title>
                  <Card.Text>
                    <strong>Teléfono:</strong> +56 123 456 789<br />
                    <strong>Email:</strong> contacto@hospital.com
                  </Card.Text>
                </Card.Body>
              </Card>
            </aside>
          </Profiler>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
