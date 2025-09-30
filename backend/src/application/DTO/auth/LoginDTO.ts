import { userRole } from "../../../shared/constants/userRole";

export interface LoginDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  _id: string;          
  fullName: string;
  email: string;
  role: userRole;        
  profileImage?: string; 
}