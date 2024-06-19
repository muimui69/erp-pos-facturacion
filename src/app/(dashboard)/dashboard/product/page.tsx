import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

import CardList from "./columns";
import { PostCreateButtonProduct } from "./post-create-button";

interface Product {
  name: string;
  description: string;
  price: number;
  categories: string;
  photo: string;
}

async function getData(): Promise<Product[]> {
  return [
    {
      name: "Camiseta de algodón",
      description: "Camiseta cómoda de algodón para uso diario",
      price: 25.99,
      categories: "ropa",
      photo: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/11/05/5e996514f272d.jpeg",
    },
    {
      name: "Zapatos deportivos",
      description: "Zapatos ideales para correr o hacer deporte",
      price: 79.99,
      categories: "calzado",
      photo: "https://pilandina.com.bo/wp-content/uploads/2019/06/xYogurt-Frutado-con-frutilla-en-trozos-750g-600x600.jpg.pagespeed.ic.9f0ExTe7dB.jpg",
    },
    {
      name: "Mesa de centro",
      description: "Mesa elegante de madera para la sala de estar",
      price: 149.99,
      categories: "muebles" ,
      photo: "https://pilandina.com.bo/wp-content/uploads/2019/06/xYogurt-Frutado-con-frutilla-en-trozos-750g-600x600.jpg.pagespeed.ic.9f0ExTe7dB.jpg",
    },
    {
      name: "Bolso de cuero",
      description: "Bolso de mano de cuero genuino",
      price: 129.50,
      categories: "accesorios",
      photo: "https://ibb.co/Gk2tkzX",
    },
    {
      name: "Lámpara colgante",
      description: "Lámpara moderna para iluminación ambiental",
      price: 59.99,
      categories: "iluminación",
      photo: "https://ibb.co/Gk2tkzX",
    }, {
      name: "Mesa de centro",
      description: "Mesa elegante de madera para la sala de estar",
      price: 149.99,
      categories: "muebles" ,
      photo: "https://pilandina.com.bo/wp-content/uploads/2019/06/xYogurt-Frutado-con-frutilla-en-trozos-750g-600x600.jpg.pagespeed.ic.9f0ExTe7dB.jpg",
    },
    {
      name: "Bolso de cuero",
      description: "Bolso de mano de cuero genuino",
      price: 129.50,
      categories: "accesorios",
      photo: "https://ibb.co/Gk2tkzX",
    },
    {
      name: "Lámpara colgante",
      description: "Lámpara moderna para iluminación ambiental",
      price: 59.99,
      categories: "iluminación",
      photo: "https://pilandina.com.bo/wp-content/uploads/2019/06/xYogurt-Frutado-con-frutilla-en-trozos-750g-600x600.jpg.pagespeed.ic.9f0ExTe7dB.jpg",
    },
    
  ];
}
export default async function ProviderPage() {
  const data = await getData()

  return (
    <DashboardShell>
      <DashboardHeader heading="Productos" text="Cree y gestione los diferentes productos en su Punto de Venta.">
      <PostCreateButtonProduct className="mr-6" />

      </DashboardHeader>
      <div className="container overflow-x-auto">
      <CardList data={data} />
      </div>
    </DashboardShell>
  )
}

