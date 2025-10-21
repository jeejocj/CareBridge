import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to PulseCare
        </h1>
        <p className="text-gray-600 mb-6">
          Your trusted platform to book doctor appointments easily and manage your health efficiently.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
          Book an Appointment
        </Button>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="shadow-lg border-blue-100">
          <CardHeader>
            <CardTitle>Find Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Browse verified doctors across multiple specialties and choose the best one for you.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-blue-100">
          <CardHeader>
            <CardTitle>Easy Scheduling</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Pick a time slot that fits your schedule and get instant confirmation.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-blue-100">
          <CardHeader>
            <CardTitle>Manage Health</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Keep track of appointments, prescriptions, and health records in one place.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
