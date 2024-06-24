import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { getUserCredentials } from "@/lib/auth"
import { getAllTenantsUser } from "@/lib/queries/tenant"
import { notFound } from "next/navigation"
import WorkAreaTenants from "@/components/workarea"

export const metadata = {
  title: "Areas de trabajo",
}

export default async function TenantsPage() {
  const user = await getUserCredentials();

  if(!user){
    return notFound() 
  }

  const tenants = await getAllTenantsUser(user?.token!)
  const tenantsData = tenants.data.allTenants;
  console.log(tenantsData)

  const pathToSubdomain = (hosting:string) => {
    return `http://${hosting}.localhost:3001?email=${user?.user.email}&workspace=${hosting}&oauth=${user?.token}`;
  }

  return (
    <WorkAreaTenants tenants={tenants} pathToSubdomain={pathToSubdomain} />
  )
}
