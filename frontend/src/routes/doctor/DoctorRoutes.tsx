import {  Routes, Route } from "react-router-dom";
import DoctorLogin from "@/pages/doctor/Login";
import DoctorSignup from "@/pages/doctor/Signup";

const DoctorRoutes = () => (
  
    <Routes>
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />     
    </Routes>

);

export default DoctorRoutes;