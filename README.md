Para las consultas API, utilicé supabase

estas son las credenciales a utilizar en el archivo env: (dejo esto acá solo para que puedan revisarlo con fines pedagógicos, tengo claro que jamás debería poner un key en un readme)

VITE_SUPABASE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3YWVzeGxqYnVsdGduZGN1emVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMzAxMDEsImV4cCI6MjA0OTcwNjEwMX0.MB0KLQCBznAEkIDo-rKPJmYOfU4H2hLJXpMj1c0PGiU

VITE_SUPABASE_URL =https://xwaesxljbultgndcuzec.supabase.co

Como archivo principal, estoy utilizando el Home en vez del app.jsx, ya que este último cumple la función de Router (para utilizar como base en los proyectos futuros) Esto lo realice para hacer fetch de los servicios de doctores y doctores desde el componente principal, para luego insertar los datos como props y cumplir con la pauta de la tarea.



Descripción de los cambios

    Home.js: Componente principal que renderiza la lista de doctores, los servicios y el formulario de citas.
    DoctorCard.js: Componente que muestra la tarjeta de cada doctor. Este componente es envuelto por un HOC para mostrar el modal con los detalles.
    DetailModal.js: Modal que muestra los detalles del doctor seleccionado.
    withModal.js: Componente de Orden Superior (HOC) que envuelve DoctorCard y proporciona la funcionalidad del modal.
    ServiceList.js: Componente que muestra una lista de los servicios disponibles.
    AppointmentForm.js: Formulario para crear citas para los pacientes.

Lógica Implementada
1. HOC - withModal.js

Un Componente de Orden Superior (HOC) llamado withModal fue creado para reutilizar la lógica de mostrar modales en varias partes del sistema. Este HOC permite mostrar un modal con información detallada de un doctor.

const withModal = (WrappedComponent, ModalContent) => {
  return (props) => {
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);

    const handleShowModal = (data) => {
      setModalData(data);
      setShowModal(true);
    };
    const handleCloseModal = () => setShowModal(false);

    return (
      <>
        <WrappedComponent {...props} onShowModal={handleShowModal} />
        {showModal && (
          <ModalContent
            show={showModal}
            onClose={handleCloseModal}
            data={modalData}
          />
        )}
      </>
    );
  };
};

Este HOC envuelve el componente DoctorCard y le da la capacidad de abrir un modal cuando el usuario hace clic en "Ver detalles".
2. Uso de DoctorCard con HOC

En el archivo Home.js, se aplica el HOC withModal al componente DoctorCard, para que cada tarjeta de doctor tenga la funcionalidad de mostrar un modal con detalles al hacer clic en "Ver detalles".

import withModal from "../../hoc/withModal";
import DetailModal from "../../components/DetailModal";

// Envuelve DoctorCard con el HOC
const DoctorCardWithModal = withModal(DoctorCard, DetailModal);

En la función Home, se renderiza la lista de doctores, y se utiliza el componente DoctorCardWithModal, que ahora incluye la funcionalidad del modal:

<Row>
  {doctors.map((doctor) => (
    <Col key={doctor.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
      <DoctorCardWithModal doctor={doctor} data={doctor} />
    </Col>
  ))}
</Row>

3. Cargar Doctores con fetchDoctors

La función fetchDoctors se llama dentro del useEffect para cargar la lista de doctores desde una API o fuente externa:

const fetchDoctors = async () => {
  try {
    const response = await getDoctors();
    setDoctors(response); // Asignamos la respuesta al estado
    setLoading(false);
  } catch (err) {
    setError("Hubo un problema al cargar los doctores.");
    setLoading(false);
  }
};

Este proceso se maneja con estados de loading y error para mostrar mensajes adecuados durante la carga o si hay un problema con la solicitud.

Las dependencias a utilizar, todas instaladas a través de npm
    "@supabase/supabase-js": "^2.47.10",
    "bootstrap": "^5.3.3",
    "react-bootstrap": "^2.10.7",
    "react-dom": "^18.3.1",
    "react-router": "^7.0.2",
    "react-router-dom": "^7.0.2"