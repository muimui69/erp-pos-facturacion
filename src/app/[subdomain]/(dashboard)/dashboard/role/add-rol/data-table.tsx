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
import { useState } from "react"
import { useTranslation } from "@/hooks/use-translation-columns"
import { useParamsClient } from "@/hooks/use-params"
import { useRols } from "@/hooks/use-rol"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { PostCreateButtonRolesPermission } from "./post-create-button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
}
interface User {
  desc: string;
}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const { subdomain, user } = useParamsClient();
  const { permissions, isLoadingPermissions, createRol } = useRols(subdomain as never, user?.token);
  const navigate = useRouter();

  const [userData, setUserData] = useState<User>({
    desc: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const table = useReactTable({
    data: permissions as TData[],
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

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const permissionSelect = table.getSelectedRowModel().flatRows.map(({ original }) => original.id)
      //   const new_employee = await postCreateAtm(name,description,price,photo,cat);
      await createRol.mutateAsync({
        subdomain: subdomain as never,
        serviceToken: user?.token!,
        role: {
          desc: userData.desc,
          permissions: permissionSelect
        }
      });
      navigate.push('/dashboard/role');
      setIsLoading(false);
      toast({
        description: "Rol creado correctamente"
      })
    } catch (err) {
      console.error("Error creando el rol", err);
      setIsLoading(false);
      toast({
        description: "No se crear el Rol. Intente de nuevo"
      })
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar permisos..."
          value={(table.getColumn("desc")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("desc")?.setFilterValue(event.target.value)
          }
          className="max-w-sm "
        />
        <DropdownMenu>

          <Input
            type="text"
            name="desc"
            placeholder="Introduzca el nombre del Rol"
            className=" ml-auto  max-w-sm"
            onChange={handleChange}
            value={userData.desc}
          />

          <PostCreateButtonRolesPermission className="ml-6" handleSubmit={handleSubmit} />

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
      <div className="rounded-md border">
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
                  {isLoadingPermissions ? "Cargando datos ..." : "No hay resultados."}
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