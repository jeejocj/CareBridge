import Signup from "@/components/shared/Auth/Signup/SignupForm";
import OTPModal from "@/components/shared/Auth/Signup/OTPModal";
import { useRegisterUser, useVerifyUserOtp } from "@/hooks/useSignupMutations";
import { useState } from "react";

const UserSignupPage = () => {
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [userData, setUserData] = useState<{
    email: string;
    password: string;
    name: string;
    role: string;
  }>({ email: "", name: "", password: "", role: "" });

  const registerUserMutation = useRegisterUser((email) => {
    setUserData({ ...userData, email });
    setIsOtpOpen(true);
  });

  const verifyOtpMutation = useVerifyUserOtp(() => {
    alert("User registered successfully!");
    setIsOtpOpen(false);
  });

  const handleSignupSubmit = (data:{name:string;password:string;role:string;email:string}) => {
    setUserData(data)
    registerUserMutation.mutate(data.email);
  };

  return (
    <>
      <Signup
        heading="User Signup"
        role="USER"
        buttonText="Create User Account"
        onSubmit={handleSignupSubmit}
      />

      <OTPModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onVerify={(otp) => verifyOtpMutation.mutate({ otp, userData })}
        email={userData.email}
      />
    </>
  );
};

export default UserSignupPage;
