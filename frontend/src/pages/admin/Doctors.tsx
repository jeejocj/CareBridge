import Table,{type Column} from "@/components/admin/Table"

type Doctor = {
  id: string
  name: string
  specialization: string
  experience: number
  email: string
  status: string
}

export default function Doctors() {
  const doctors: Doctor[] = [
    {
      id: "D001",
      name: "Dr. John Mathew",
      specialization: "Cardiologist",
      experience: 10,
      email: "john@example.com",
      status: "Approved",
    },
    {
      id: "D002",
      name: "Dr. Sara Joseph",
      specialization: "Dermatologist",
      experience: 8,
      email: "sara@example.com",
      status: "Pending",
    },
    {
      id: "D003",
      name: "Dr. Alan Joy",
      specialization: "Neurologist",
      experience: 12,
      email: "alan@example.com",
      status: "Approved",
    },
  ]

  // ✅ Type the columns explicitly
  const columns: Column<Doctor>[] = [
    { header: "Doctor ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Specialization", accessor: "specialization" },
    { header: "Experience (Years)", accessor: "experience" },
    { header: "Email", accessor: "email" },
    { header: "Status", accessor: "status" },
  ]

  const actions = [
    {
      label: "View",
      variant: "outline" as const,
      onClick: (row: Doctor) => console.log("View doctor:", row),
    },
    {
      label: "Block",
      variant: "destructive" as const,
      onClick: (row: Doctor) => console.log("Block doctor:", row.name),
    },
  ]

  return (
    <div>
      <Table
        title="Doctors Management"
        data={doctors}
        columns={columns}
        actions={actions}
        currentPage={1}
        totalPages={1}
      />
    </div>
  )
}
