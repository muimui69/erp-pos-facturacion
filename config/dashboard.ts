import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    // {
    //   title: "Documentation",
    //   href: "/docs",
    // },
    // {
    //   title: "Support",
    //   href: "/support",
    //   disabled: true,
    // },
    {
      title: "",
      href: "",
    },
  ],
  sidebarNav: [
    {
      title: "Panel de control",
      href: "/dashboard",
      icon: "layoutDashboard",
    },
    {
      title: "Empleados",
      href: "/dashboard/employee",
      icon: "user",
    },
    {
      title: "Ciudades",
      href: "/dashboard/city",
      icon: "map",
    },
    {
      title: "Sucursales",
      href: "/dashboard/branch",
      icon: "mapPinned",
    },
    {
      title: "Cajas",
      href: "/dashboard/box ",
      icon: "handCoins",
    },
    {
      title: "Categorias",
      href: "/dashboard/category",
      icon: "listCollapse",
    },
    {
      title: "Proveedores",
      href: "/dashboard/provider",
      icon: "truck",
    },
    {
      title: "Productos",
      href: "/dashboard/product",
      icon: "shoppingBasket",
    },
    {
      title: "Roles",
      href: "/dashboard/role",
      icon: "rol"
    },
    {
      title:"Invitaciones",
      href:"/dashboard/invitation",
      icon:"mail"
    },
    {
      title: "Personalizacion",
      href: "/dashboard/personalization",
      icon: "palette",
    },
    // {
    //   title: "",
    //   href: "",
    //   icon: "colapse",
    // },
  ],
}
