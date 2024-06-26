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
    return `http://${hosting}.${process.env.NEXT_PUBLIC_HOST}?email=${user?.user.email}&workspace=${hosting}&oauth=${user?.token}`;
  }

  return (
    <WorkAreaTenants tenants={tenants} pathToSubdomain={pathToSubdomain} />
  )
}
