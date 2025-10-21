import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// ✅ Column type — keys must match object keys
export interface Column<T extends object> {
  header: string
  accessor: keyof T
}

// ✅ Action type — safe row access
interface Action<T extends object> {
  label: string
  variant?: "default" | "destructive" | "outline"
  onClick: (row: T) => void
}

// ✅ DataTable props — fully generic
interface DataTableProps<T extends object> {
  title?: string
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  searchPlaceholder?: string
  currentPage?: number
  totalPages?: number
  onNext?: () => void
  onPrevious?: () => void
}

export default function DataTable<T extends object>({
  title,
  data,
  columns,
  actions = [],
  searchPlaceholder = "Search...",
  currentPage = 1,
  totalPages = 1,
  onNext,
  onPrevious,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("")

  // ✅ Filters all rows based on search query
  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <Input
        placeholder={searchPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.accessor)}>{col.header}</TableHead>
            ))}
            {actions.length > 0 && <TableHead>Action</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={String(col.accessor)}>
                    {String(row[col.accessor])}
                  </TableCell>
                ))}

                {actions.length > 0 && (
                  <TableCell className="flex gap-2">
                    {actions.map((action, i) => (
                      <Button
                        key={i}
                        variant={action.variant || "default"}
                        size="sm"
                        onClick={() => action.onClick(row)}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions.length ? 1 : 0)}
                className="text-center text-gray-500"
              >
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>

        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>

        <Button onClick={onNext} disabled={currentPage >= totalPages}>
          Next
        </Button>
      </div>
    </div>
  )
}
