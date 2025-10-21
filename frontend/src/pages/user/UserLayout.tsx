import { Outlet } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import NavBar from "@/components/user/NavBar"
import Footer from "@/components/user/Footer"

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <Separator />
      <main className="flex-1">
        <Outlet />
      </main>
      <Separator />
      <Footer />
    </div>
  )
}

export default UserLayout
