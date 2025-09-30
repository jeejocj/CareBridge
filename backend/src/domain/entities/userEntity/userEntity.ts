import { userRole } from "../../../shared/constants/userRole";
import { doctorStatus } from "../../../shared/constants/doctorStatus";
import { userGender } from "../../../shared/constants/userGender";


export interface Address {
  houseName?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: number;
}

export interface ClinicAddress {
  clinicName?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: number;
}

export interface DoctorBio {
  experience?: string[];
  degrees?: string[];
  awards?: string[];
}

export interface DoctorProfile {
  specialization?: string;
  licenseNumber?: string;
  bio?: DoctorBio;
  yearsOfExperience?: number;
  status?: doctorStatus;
  clinicAddress?: ClinicAddress;
  isKycVerified?: boolean;
}

export interface userEntity {
  _id?: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;

  role: userRole;
  isBlocked?: boolean;

  address?: Address;
  dateOfBirth?: Date;
  gender?: userGender;

  lastLogin?: Date;
  doctorProfile?: DoctorProfile; 

  createdAt?: Date;
  updatedAt?: Date;
  lastUpdated?: Date;
}
