import { Data } from "@/lib/queries/interfaces/auth.interface";
import { GetTenantsUserResponse } from "@/lib/queries/interfaces/tenant.interface";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host")!;
  const path = url.pathname;
  const cookie = req.cookies.get('user') || req.cookies.get('tenant-user');
  const cookieTokenTenant = req.cookies.get('tenant-user-token');
  const token = url.searchParams.get('oauth');
  const subdomainTest = hostname.split(".").slice(0, -1).join(".");

  console.log('>>>>>>>>>>>>>>>>>>>>', subdomainTest, cookie)



  if (!cookie && !token && subdomainTest) {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }

  if (!cookie && !subdomainTest) {
    return NextResponse.next();
  }

  let user: Data | null = null;
  let tokenTenant: string = "";
  if (cookie) {
    try {
      user = JSON.parse(cookie.value);
      if (cookieTokenTenant) {
        tokenTenant = JSON.parse(cookieTokenTenant?.value!)
      }
    } catch (error) {
      console.error('Error parsing cookie:', error);
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }
  }


  const tokenToUse = user?.token || token || tokenTenant;

  if (!tokenToUse) {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }


  const tenants: GetTenantsUserResponse = await getTenants(tokenToUse);

  // Define los dominios permitidos (localhost y dominio para producción)
  // Define allowed Domains (localhost and production domain)
  const allowedDomains = ["localhost:3001","localhost:3000", "tudominio.com"];

  // Verificamos si el hostname existe en los dominios permitidos
  // Verify if hostname exist in allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));


  // Extraemos el posible subdominio en la URL
  // Extract the possible subdomain in the URL
  const subdomain = hostname.split(".").slice(0, -1).join(".");


  console.log('========subdomain=========>', subdomain, tenants)


  // Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
  // Si nos quedamos en un dominio permitido y no es un subdominio, permitimos la solicitud.
  if (isAllowedDomain && !tenants.data.allTenants.some(d => d.tenant.hosting === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = tenants.data.allTenants.find(d => d.tenant.hosting === subdomain);

  // es opcional a modificar
  if (subdomain === "") {
    return NextResponse.next();
  }

  if (subdomainData) {
    // Rewrite the URL in the dynamic route based in the subdomain
    // Reescribe la URL a una ruta dinámica basada en el subdominio
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
  }

  return NextResponse.next();
}


const getTenants = async (token: string) => {
  const response = await fetch(`${process.env.BASE_URL_LOCALHOST_BACK}/tenant/user`, {
    headers: {
      "auth-token": token
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
}
