import { Schema } from "mongoose";
import { userRole } from "../../../shared/constants/userRole";
import { userGender } from "../../../shared/constants/userGender";
import { doctorStatus } from "../../../shared/constants/doctorStatus";


export type DoctorStatus = "AVAILABLE" | "UNAVAILABLE";

export const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    profileImage: { type: String },

    role: {
      type: String,
      enum: Object.values(userRole), 
      default: userRole.USER,
    },

    address: {
      houseName: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: Number },
    },

    isBlocked: { type: Boolean, default: false },

    dateOfBirth: { type: Date },

    gender: {
      type: String,
      enum: Object.values(userGender), 
      default: userGender.MALE,
    },

    lastLogin: { type: Date },

    doctorProfile: {
      specialization: { type: String },
      licenseNumber: { type: String, unique: true, sparse: true },
      bio: {
        experience: [{ type: String }],
        degrees: [{ type: String }],
        awards: [{ type: String }],
      },
      yearsOfExperience: { type: Number },
      status: {
      type: String,
      enum: Object.values(doctorStatus), 
      default: doctorStatus.UNAVAILABLE,
    },
      clinicAddress: {
        clinicName: { type: String },
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: Number },
      },
      isKycVerified: { type: Boolean, default: false }, 
    },
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  }
);


