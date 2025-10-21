import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { loginSchema,type LoginFormInputs } from "@/components/shared/Auth/Login/loginValidation"
import { useLoginUser } from "@/hooks/useSignupMutations"
import { useNavigate } from "react-router-dom"

interface LoginProps {
  heading: string
  role: "USER" | "DOCTOR" | "ADMIN"
  buttonText?: string
}


const Login = ({ heading = "Login", role = "USER", buttonText = "Login" }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()
  const { mutate: login, isPending } = useLoginUser((data) => {
  console.log(`${role} login success:`, data)

    if (role === "USER") navigate("/")
    else if (role === "DOCTOR") navigate("/doctor/dashboard")
    else if (role === "ADMIN") navigate("/admin/dashboard")
  })


  const onSubmit = (data: LoginFormInputs) => {
    console.log(`${role} login data:`, data)
    login({ email: data.email, password: data.password }) 
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">{heading}</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl" disabled={isPending}>
          {isPending ? "Logging in..." : buttonText}
        </Button>
      </form>
    </div>
  )
}

export default Login