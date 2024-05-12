import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
    //  * Match all paths except for:
    //  * 1. /api routes
    //  * 2. /_next (Next.js internals)
    //  * 3. /_static (inside /public)
    //  * 4. all root files inside /public
     */
    "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
  ],
};
const subdomains = [
  {
    subdomain:"penesito.uagrm",
  },
  {
    subdomain:"trabajos.dinos.uagrm",
  },
  {
    subdomain:"penesito.uagrm.qweqwe.qwe.qwe3124"
  }
]

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host")!;
  const path = url.pathname;
  const href = url.href;


  // Define los dominios permitidos (localhost y dominio para producción)
  // Define allowed Domains (localhost and production domain)
  const allowedDomains = ["localhost:3001", "tudominio.com"];

  // Verificamos si el hostname existe en los dominios permitidos
  // Verify if hostname exist in allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));


  // Extraemos el posible subdominio en la URL
  // Extract the possible subdomain in the URL
  const subdomain = hostname.split(".").slice(0, -1).join(".");


  console.log('========subdomain=========>',subdomain)


  // Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
  // Si nos quedamos en un dominio permitido y no es un subdominio, permitimos la solicitud.
  if (isAllowedDomain && !subdomains.some(d => d.subdomain === subdomain)) {
    return NextResponse.next();
  }

  const subdomainData = subdomains.find(d => d.subdomain === subdomain);

  // // es opcional a modificar
  // if (subdomain === "www" || subdomain === "") {
  //   return NextResponse.next();
  // }

  if (subdomainData) {
    // Rewrite the URL in the dynamic route based in the subdomain
    // Reescribe la URL a una ruta dinámica basada en el subdominio
    return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
  }

  return NextResponse.next();
}