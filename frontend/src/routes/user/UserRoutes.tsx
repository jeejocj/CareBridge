import { Routes, Route } from "react-router-dom";
import Home from "@/pages/user/Home";
import UserLogin from "@/pages/user/Login";
import UserSignup from "@/pages/user/Signup";
import UserLayout from "@/pages/user/UserLayout";


const UserRoutes = () => (

    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<UserLogin />} />
        <Route path="signup" element={<UserSignup />} />
      </Route>
    </Routes>
  
);

export default UserRoutes;