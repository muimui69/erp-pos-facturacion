// import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
// import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// // import { putUpdateRole } from "@/lib/queries/role"; // Importa la función para actualizar roles desde tu API

// export const DialogEditRole = ({ data, setIsDialogOpen }: { setIsDialogOpen: Dispatch<SetStateAction<boolean>>, data: Role }) => {
//     const [roleData, setRoleData] = useState({
//         name: data.name,
//         permissions: data.permissions // Copia las selecciones de permisos del rol existente
//     });

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = event.target;
//         setRoleData(prevData => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const handlePermissionChange = (permission: string) => {
//         // Copia la lista de permisos actual y agrega o elimina el permiso seleccionado
//         const updatedPermissions = roleData.permissions.includes(permission)
//             ? roleData.permissions.filter(p => p !== permission)
//             : [...roleData.permissions, permission];
//         setRoleData(prevData => ({
//             ...prevData,
//             permissions: updatedPermissions
//         }));
//     };

//     const handleEditRole = async () => {
//         try {
           
//           //  await putUpdateRole(roleData); 
//             setIsDialogOpen(false);
     
//         } catch (error) {
//             console.error("Error al editar el rol:", error);
     
//         }
//     };

//     return (
//         <DialogContent className="sm:max-w-[425px]">
//             <DialogHeader>
//                 <DialogTitle>Editar Rol</DialogTitle>
//                 <DialogDescription>
//                     Realice cambios aquí. Haga clic en guardar cambios cuando haya terminado.
//                 </DialogDescription>
//             </DialogHeader>
//             <div className="grid gap-4 py-4">
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label htmlFor="name" className="text-right">
//                         Nombre
//                     </Label>
//                     <Input
//                         id="name"
//                         name="name"
//                         value={roleData.name}
//                         onChange={handleChange}
//                         className="col-span-3"
//                     />
//                 </div>
//                 <div className="grid grid-cols-4 items-center gap-4">
//                     <Label className="text-right">Permisos</Label>
//                     <div className="col-span-3">
//                         {availablePermissions.map(permission => (
//                             <div key={permission} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id={permission}
//                                     checked={roleData.permissions.includes(permission)}
//                                     onChange={() => handlePermissionChange(permission)}
//                                     className="mr-2"
//                                 />
//                                 <label htmlFor={permission}>{permission}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <DialogFooter>
//                 <Button
//                     onClick={handleEditRole}
//                     type="button"
//                 >
//                     Guardar cambios
//                 </Button>
//             </DialogFooter>
//         </DialogContent>
//     );
// };
