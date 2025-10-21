import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormInputs } from "./signupValidation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface SignupProps {
  heading?: string;
  role?: "USER" | "DOCTOR" | "ADMIN";
  buttonText?: string;
  onSubmit: (data: {
    name: string;
    password: string;
    role: string;
    email: string;
  }) => void;
}

const Signup = ({
  heading = "Signup",
  role = "USER",
  buttonText = "Signup",
  onSubmit, 
}: SignupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const handleFormSubmit = (data: SignupFormInputs) => {
    console.log(`${role} signup data:`, data);
    onSubmit({
      email: data.email,
      name: data.name,
      password: data.password,
      role,
    });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        {heading}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <Label>Name</Label>
          <Input type="text" {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl mt-4">
          {buttonText}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
