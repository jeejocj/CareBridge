import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { registerUser, verifyUserOtp,loginUser } from "@/api/auth";

export const useRegisterUser = (onOtpOpen: (email: string) => void) => {
  return useMutation({
    mutationFn: (email: string) => registerUser(email),
    onSuccess: (_, email) => onOtpOpen(email),
    onError: (err: AxiosError) => {
      const message =(err.response?.data as { message?: string })?.message || "User signup failed";
      alert(message);
    },
  });
};

export const useVerifyUserOtp = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: (payload: {otp: string; userData: { name: string; email: string; password: string; role: string };}) => {
      return verifyUserOtp({
        otp: payload.otp,
        userData: {
          email: payload.userData.email,
          fullName: payload.userData.name,
          password: payload.userData.password,
          role: payload.userData.role,
        },
      });
    },
    onSuccess: () => onSuccessCallback(),
    onError: (err: AxiosError) => {
      const message = (err.response?.data as { message?: string })?.message || "Invalid OTP";
      alert(message);
    },
  });
};



export const useLoginUser = (onSuccessCallback: (data:{accessToken:string,user:{fullName:string,role:string,email:string}}) => void) => {
  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginUser(credentials),

    onSuccess: (data) => {
      onSuccessCallback({accessToken:data.data.accessToken,user:{fullName:data.data.user.fullName,email:data.data.user.email,role:data.data.user.role}});
    },

    onError: (err: AxiosError) => {
      const message =
        (err.response?.data as { message?: string })?.message ||
        "Login failed. Please check your credentials.";
      alert(message);
    },
  });
};

