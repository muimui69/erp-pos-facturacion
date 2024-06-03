import { DashboardShell } from "@/components/shell";


import { DashboardHeader } from "@/components/header";


import { DataTable } from "./data-table";
import { columns } from "./columns";
import { PostCreateButtonRoles } from "./post-create-button";




async function getData(): Promise<any[]> {
    return [
      {
        id: "m5gr84i9",
        desc: "Crear Producto ",
        
      },
      {
        id: "3u1reuv4",
        desc: "Editar Producto",
        
      },
      {
        id: "derv1ws0",
        desc: "Eliminar Producto",
       
      },
      {
        id: "5kma53ae",
        desc: "Ver informes",
        
      },
      {
        id: "bhqecj4p",
        desc: "Crear Reportes",
      
      }, {
        id: "m5gr84i9",
        desc: "Crear Producto ",
        
      },
      {
        id: "3u1reuv4",
        desc: "Editar Producto",
        
      },
      {
        id: "derv1ws0",
        desc: "Eliminar Producto",
       
      },
      {
        id: "5kma53ae",
        desc: "Ver informes",
        
      },{
        id: "5kma53ae",
        desc: "Ver informes",
        
      },{
        id: "5kma53ae",
        desc: "Ver informes",
        
      },
    ];
  }
  
export default  async function addroles(){
   
  const data =  await getData();
    return(
        <>
      <DashboardShell>
      <DashboardHeader heading="Roles" text="Cree y gestione los diferentes Roles de su punto de venta.">
        <PostCreateButtonRoles className="mr-6"/>

      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
        </>
        

    )

}