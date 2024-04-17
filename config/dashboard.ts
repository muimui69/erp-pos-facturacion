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
      title: "Empleados",
      href: "/dashboard",
      icon: "user",
    },
    {
      title: "Sucursales",
      href: "/dashboard/billing",
      icon: "warehouse",
    },
    {
      title: "Productos",
      href: "/dashboard/settings",
      icon: "shoppingBasket",
    },
    {
      title: "Categorias",
      href: "/dashboard/settings",
      icon: "listCollapse",
    },
  ],
}
