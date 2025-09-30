import { userRole } from "../../../shared/constants/userRole";


export interface CreateUserDTO {
  fullName: string;
  email: string;
  password: string;
  phone:string,
  role: userRole;
}

export interface UserResponseDTO {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: userRole;
  profileImage?: string;
}