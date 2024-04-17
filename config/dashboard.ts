import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
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
      title: "Sucursales",
      href: "/dashboard/branch",
      icon: "warehouse",
    },
    {
      title: "Productos",
      href: "/dashboard/product",
      icon: "shoppingBasket",
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
      title: "Cajas",
      href: "/dashboard/box ",
      icon: "handCoins",
    },
  ],
}
