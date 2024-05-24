import { Params } from "@/lib/constants";

interface AuthLayoutProps {
  children: React.ReactNode;
  params:Params;
}

export default async function AuthLayout({ children,params }: AuthLayoutProps) {
  console.log(params)
  return <div className="min-h-screen">{children}</div>
}
