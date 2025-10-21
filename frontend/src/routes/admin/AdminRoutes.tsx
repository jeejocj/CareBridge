import {  Routes, Route } from "react-router-dom";
import AdminLogin from "@/pages/admin/Login";
import AdminLayout from "@/pages/admin/AdminLatyout";
import Dashboard from "@/pages/admin/Dashboard";
import DoctorVerification from "@/pages/admin/DoctorVerification";
import Departments from "@/pages/admin/Departments";
import Doctors from "@/pages/admin/Doctors";
import Patients from "@/pages/admin/Patients";


const AdminRoutes = () => (
  
    <Routes>
        <Route path="/admin/login" element={<AdminLogin />} /> 
        <Route element = {<AdminLayout/>}>
         <Route path="/admin/dashboard" element={<Dashboard />} /> 
         <Route path="/admin/doctor-verification" element={<DoctorVerification />} /> 
         <Route path="/admin/doctors" element={<Doctors />} />
         <Route path="/admin/departments" element={<Departments />} />  
         <Route path="/admin/patients" element={<Patients />} />  
        </Route>
    </Routes>

);

export default AdminRoutes;