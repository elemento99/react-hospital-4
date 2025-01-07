import { createContext, useContext, useState } from "react";
import supabase from "../supabase/client";

export const HospitalContext = createContext()

export const useHospital = () => {
  const context = useContext(HospitalContext)
  if (context === undefined) {
    throw new Error("useHospital must be used within a HospitalContextProvider")
  }
  return context;
};

export const HospitalContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([])
  const [error, setError] = useState(null) 
  const [services, setServices]= useState([])
  const [loading, setLoading]= useState(false)
  const[doctorServices,setDoctorServices]=useState([])



  const getDoctors = async () => {
    try {
      const { error, data } = await supabase
        .from("doctors")
        .select("*")

      if (error) {
        throw error
      }

      setDoctors(data)
    } catch (error) {
      setError(error.error_description || error.message)
    } 
  }
  const fetchDoctors = async () => {
    try {
      await getDoctors()
    } catch (err) {
      console.error('Error al cargar los doctores:', err)
    } 

    
  }

  const getServices = async ()=>{
    try{const{data, error}= await supabase
    .from("services")
    .select("*")
    if(error){throw error}
    setServices(data)
  }catch(error){
    setError(error,error_description || error.message)
  }
  }
 
  const fetchServices = async () => {
    try {
      await getServices()
    } catch (err) {
      console.error('Error al cargar los servicios:', err)
    }
  }
  const fetchDoctorServices=  async function getServiceDoctors() {
    const { data, error } = await supabase
      .from('doctor_services')
      .select(`
        service_id,
        services (name),
        doctor_id,
        doctors (name)
      `);
  
    if (error) {
      console.error('Error fetching service doctors:', error);
      return;
    }
  
    setDoctorServices(data)
  }
  

  


  return (
    <HospitalContext.Provider value={{ doctors, services, loading, error, getDoctors, getServices, doctorServices, fetchServices, fetchDoctors,fetchDoctorServices }}>
      {children}
    </HospitalContext.Provider>
  )
}
