export interface UserData {
  id: string
  name: string
  email: string
  role: "USER" | "DOCTOR" | "ADMIN"
  status:boolean
}
