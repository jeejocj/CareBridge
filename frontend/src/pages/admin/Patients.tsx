import Table, { type Column } from "@/components/admin/Table"

type Patient = {
  id: string
  name: string
  age: number
  gender: "Male" | "Female" | "Other"
  status: string
}

const patients: Patient[] = [
  { id: "P001", name: "Alice Johnson", age: 30, gender: "Female", status: "Active" },
  { id: "P002", name: "Bob Smith", age: 45, gender: "Male", status: "Active" },
  { id: "P003", name: "Charlie Davis", age: 28, gender: "Male", status: "Pending" },
]

const columns: Column<Patient>[] = [
  { header: "Patient ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Gender", accessor: "gender" },
  { header: "Status", accessor: "status" },
]

const actions = [
  {
    label: "View Details",
    variant: "outline" as const,
    onClick: (row: Patient) => console.log("View patient:", row),
  },
  {
    label: "Block",
    variant: "destructive" as const,
    onClick: (row: Patient) => console.log("Block patient:", row.name),
  },
]


export default function Patients() {
  return (
    <div>
      <Table
        title="Patients Management"
        data={patients}
        columns={columns}
        actions={actions}
        currentPage={1}
        totalPages={1}
      />
    </div>
  )
}
