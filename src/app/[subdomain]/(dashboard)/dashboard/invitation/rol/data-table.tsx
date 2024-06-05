"use client"
import {
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation-columns"
import { useParamsClient } from "@/hooks/use-params"
import { useRols } from "@/hooks/use-rol"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { AllRole } from "@/lib/queries/interfaces/rol.interface"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  onRolSelect: (rolId: number) => void
}
interface User {
  desc: string;
}


export function DataTableRole<TData, TValue>({
  columns,
  data,
  onRolSelect
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const { subdomain, user } = useParamsClient();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<AllRole[]>([]);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const { rols } = useRols(subdomain as never, user?.token, search!);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
    const selectedRows = table.getSelectedRowModel().flatRows;
    const firstSelectedRow = selectedRows.length > 0 ? selectedRows[0] : null;
    const selectedRolId = firstSelectedRow ? firstSelectedRow.original.id : null;
    // onRolSelect(selectedRolId)
  };

  const handleSearch = async () => {
    setIsLoadingSearch(true);
    setSearchResults(rols);
    setIsLoadingSearch(false);
  };


  const table = useReactTable({
    data: searchResults as TData[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const selectedRows = table.getSelectedRowModel().flatRows;
  const firstSelectedRow = selectedRows.length > 0 ? selectedRows[0] : null;
  const selectedRolId = firstSelectedRow ? firstSelectedRow.original.id : null;

  console.log(selectedRolId)

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().flatRows;
    const firstSelectedRow = selectedRows.length > 0 ? selectedRows[0] : null;
    const selectedRolId = firstSelectedRow ? firstSelectedRow.original.id : null;
    onRolSelect(selectedRolId);
  }, [table.getSelectedRowModel()])


  return (
    <div className="w-full">
      <div className="flex items-center mb-8">
        {/* <Input
          placeholder="Filtrar roles..."
          value={(table.getColumn("desc")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("desc")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        /> */}


        <Input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-sm"
        />

        <Button onClick={handleSearch} disabled={isLoadingSearch} className="ml-2">
          {isLoadingSearch ? "Buscando..." : "Buscar"}
        </Button>

        <DropdownMenu>

          {/* <PostCreateButtonRolesPermission className="ml-6" handleSubmit={handleSubmit} /> */}

          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border" style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (

                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoadingSearch ? "Cargando datos ..." : "No hay resultados."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  )
}