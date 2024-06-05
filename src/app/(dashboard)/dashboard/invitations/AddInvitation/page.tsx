import { DashboardShell } from "@/components/shell";


import { DashboardHeader } from "@/components/header";


import { DataTable } from "./data-table";
import { Rol, columns } from "./column";
import { PostAddButtonRol } from "./post-create-button";
async function getData(): Promise<Rol[]> {
    return [
      {
        id: "m5gr84i9",
        desc: "Crear Producto ",
        
      },
      {
        id: "3u1reuv4",
        desc: "Abe Smith",
        
      },
      {
        id: "derv1ws0",
        desc: "Monserrat Garcia",
       
      },
      {
        id: "5kma53ae",
        desc: "Silas Brown",
        
      },
      {
        id: "bhqecj4p",
        desc: "Carmella Rodriguez",
      
      },{
        id: "m5gr84i9",
        desc: "Ken Johnson",
        
      },
      {
        id: "3u1reuv4",
        desc: "Abe Smith",
        
      },
      {
        id: "derv1ws0",
        desc: "Monserrat Garcia",
       
      },
      {
        id: "5kma53ae",
        desc: "Silas Brown",
        
      },
      {
        id: "bhqecj4p",
        desc: "Carmella Rodriguez",
      
      },{
        id: "m5gr84i9",
        desc: "Ken Johnson",
        
      },
      {
        id: "3u1reuv4",
        desc: "Abe Smith",
        
      },
      {
        id: "derv1ws0",
        desc: "Monserrat Garcia",
       
      },
      {
        id: "5kma53ae",
        desc: "Silas Brown",
        
      },
      {
        id: "bhqecj4p",
        desc: "Moyra Rodriguez",
      
      },
    ];
  }
  
export default  async function addInvitation(){
   
  const data =  await getData();
    return(
        <>
      <DashboardShell>
      <DashboardHeader heading="Invitaciones" text="Seleccione un Empleado para enviar la Invitacion">
        <PostAddButtonRol/>
      </DashboardHeader>
      <div className="container overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </DashboardShell>
        </>
        

    )

}