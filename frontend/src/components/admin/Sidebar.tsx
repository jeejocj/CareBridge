import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  Building2,
  Stethoscope,
  CreditCard,
  CalendarCheck,
  MessageSquareWarning,
  Gift,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
      { name: "Doctor Verification", icon: UserCheck, path: "/admin/doctor-verification" },
      { name: "Doctors", icon: Stethoscope, path: "/admin/doctors" },
      { name: "Departments", icon: Building2, path: "/admin/departments" },
      { name: "Patients", icon: Users, path: "/admin/patients" },
    ],
  },
  {
    title: "Transactions",
    items: [
      { name: "Doctor Payment", icon: CreditCard, path: "/admin/doctor-payment" },
      { name: "Appointment Details", icon: CalendarCheck, path: "/admin/appointments" },
      { name: "Dispute", icon: MessageSquareWarning, path: "/admin/dispute" },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Coupon", icon: Gift, path: "/admin/coupon" },
      { name: "Wallet", icon: Wallet, path: "/admin/wallet" },
      { name: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1B3A57] text-white shadow-md flex flex-col rounded-r-3xl">
      <div className="p-6 border-b border-blue-900">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          PulseCare Admin
        </h1>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-4">
            <h2 className="text-xs uppercase text-gray-400 px-4 mb-2">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map(({ name, icon: Icon, path }) => (
                <li key={name}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-blue-100 text-blue-900"
                          : "text-gray-100 hover:bg-blue-800"
                      )
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-blue-900 p-3">
        <button className="flex items-center gap-3 px-4 py-2.5 text-gray-100 hover:bg-blue-800 rounded-lg w-full transition-colors">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
