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


export function DataTable<TData extends { id?: number | string }, TValue>({
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
    data: permissions as unknown as TData[],
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
      await createRol.mutateAsync({
        subdomain: subdomain as never,
        serviceToken: user?.token!,
        role: {
          desc: userData.desc,
          permissions: permissionSelect as never
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
      <div className="flex flex-col sm:md:flex-row items-center py-4 m-2">
        <Input
          placeholder="Filtrar permisos ..."
          value={(table.getColumn("desc")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("desc")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm md:mr-5"
        />
        <DropdownMenu>

          <Input
            type="text"
            name="desc"
            placeholder="Introduzca el nombre del Rol"
            className="w-full md:max-w-sm md:mr-5 sm:mt-2 md:mt-0"
            onChange={handleChange}
            value={userData.desc}
          />

          <div className="hidden md:lg:block">
            <PostCreateButtonRolesPermission className="m-2 ml-0" handleSubmit={handleSubmit} />
          </div>

          <div className="block md:lg:hidden w-full">
            <PostCreateButtonRolesPermission className="w-full m-2 ml-0" handleSubmit={handleSubmit} />
          </div>

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
      <div className="rounded-md border m-2">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccioandas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  )
}