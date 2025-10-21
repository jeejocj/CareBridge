import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="ml-64 flex-1 bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
}
