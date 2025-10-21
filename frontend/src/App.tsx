import { useLocation } from "react-router-dom";
import UserRoutes from "./routes/user/UserRoutes";
import DoctorRoutes from "./routes/doctor/DoctorRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";

function App() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith("/doctor")) {
    return <DoctorRoutes />;
  }

  if (path.startsWith("/admin")) {
    return <AdminRoutes />;
  }
  
  return <UserRoutes />;
}

export default App;
