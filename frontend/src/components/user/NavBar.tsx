import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"

export default function NavBar() {
  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        {/* Brand */}
        <Link to="/" className="text-2xl font-semibold text-blue-600">
          PulseCare
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="space-x-6">
            <NavigationMenuItem>
              <Link to="/" className="text-sm font-medium hover:text-blue-600">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/doctors" className="text-sm font-medium hover:text-blue-600">
                Doctors
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/appointments" className="text-sm font-medium hover:text-blue-600">
                Appointments
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="space-x-3 flex items-center">
          {/* For Doctors */}
          <Link to="/doctor/login">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
              For Doctors
            </Button>
          </Link>

          <Link to="/login">
            <Button variant="outline" className="rounded-xl">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="rounded-xl bg-blue-600 hover:bg-blue-700">
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
