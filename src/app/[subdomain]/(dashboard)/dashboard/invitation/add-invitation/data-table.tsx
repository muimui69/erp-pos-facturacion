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
import { useInvitations } from "@/hooks/user-invitation"
import { AllUser } from "@/lib/queries/interfaces/invitation.interface"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  onUserSelect: (userIds: string[]) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onUserSelect
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { translation } = useTranslation()
  const { subdomain, user } = useParamsClient();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<AllUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userInvitations } = useInvitations(subdomain as never, user?.token, search!);

  const handleSearchChange = (event: any) => {
    setSearch(event.target.value);
    // const usersSelect = table.getSelectedRowModel().flatRows.map(({ original }) => original.id)
    // onUserSelect(usersSelect)
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchResults(userInvitations);
    setIsLoading(false);
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

  const usersSelect = table.getSelectedRowModel().flatRows.map(({ original }) => original.id)
  console.log(usersSelect)

  useEffect(() => {
    const usersSelect = table.getSelectedRowModel().flatRows.map(({ original }) => original.id)
    onUserSelect(usersSelect)
  }, [table.getSelectedRowModel()])

  return (
    <div className="w-full">
      <div className="flex items-center">
        {/* <Input
          placeholder="Buscar por nombre o correo..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        /> */}

        <Input
          placeholder="Buscar por nombre o correo..."
          value={search}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Button onClick={handleSearch} disabled={isLoading} className="ml-2">
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>


        <DropdownMenu>

          {/* <Input type="email" placeholder="Enviar Correo..." className=" ml-auto  max-w-sm"/> */}

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
      <div className="rounded-md border mt-8">
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
                  {isLoading ? "Cargando datos ..." : "No hay resultados."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}