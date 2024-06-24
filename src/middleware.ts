// import { href } from "@/lib/constants";
// import { Data } from "@/lib/queries/interfaces/auth.interface";
// import { GetTenantsResponse } from "@/lib/queries/interfaces/tenant.interface";
// import { NextRequest, NextResponse } from "next/server";

// export const config = {
//   matcher: [
//     /*
//     //  * Match all paths except for:
//     //  * 1. /api routes
//     //  * 2. /_next (Next.js internals)
//     //  * 3. /_static (inside /public)
//     //  * 4. all root files inside /public
//     */
//     "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
//   ],
// };

// export default async function middleware(req: NextRequest) {

//   const cookie = req.cookies.get('user');
//   const url = req.nextUrl;
//   const hostname = req.headers.get("host")!;
//   const path = url.pathname;
//   let allTenants;

//   // Extraemos el posible subdominio en la URL
//   // Extract the possible subdomain in the URL
//   const subdomain = hostname.split(".").slice(0, -1).join(".");
//   console.log('========subdomain===========>', subdomain)


//   if ((!cookie || cookie) && path.startsWith('/dashboard') && !subdomain) {
//     // return NextResponse.next();
//     return NextResponse.rewrite(new URL('/unauthorized', req.url));
//   }

//   if (!cookie) {
//     // return NextResponse.rewrite(new URL('/unauthorized', req.url));
//     return NextResponse.next()
//   }


//   // Define los dominios permitidos (localhost y dominio para producción) 
//   // Define allowed Domains (localhost and production domain)
//   const allowedDomains = ["localhost:3001", "tudominio.com"];

//   // Verificamos si el hostname existe en los dominios permitidos
//   // Verify if hostname exist in allowed domains
//   const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

//   console.log('========subdomain========?=>', subdomain)

//   const requestHeaders = new Headers(req.headers);
//   requestHeaders.set('x-next-pathname', req.nextUrl.href);

//   const user: Data = JSON.parse(cookie?.value!);
//   const tenants: GetTenantsResponse = await getTenants(user.token)
//   allTenants = tenants.data.allTenants;
//   requestHeaders.set('tenants', JSON.stringify(allTenants));


//   // Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
//   // Si nos quedamos en un dominio permitido y no es un subdominio, permitimos la solicitud.
//   if (isAllowedDomain && !allTenants.some(d => d.tenant.hosting === subdomain)) {
//     if (path.startsWith('/dashboard')) {
//       return NextResponse.rewrite(new URL('/unauthorized', req.url));
//     }
//     return NextResponse.next();
//   }

//   const subdomainData = allTenants.find(d => d.tenant.hosting === subdomain);


//   if (subdomainData) {
//     // Rewrite the URL in the dynamic route based in the subdomain
//     // Reescribe la URL a una ruta dinámica basada en el subdominio
//     return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
//   }


//   return NextResponse.next();
// }


// const getTenants = async (token: string) => {
//   const response = await fetch('http://localhost:3000/api/tenant/user', {
//     headers: {
//       "auth-token": token
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json();
//   return data;
// }


import { Data, DataTenant } from "@/lib/queries/interfaces/auth.interface";
import { GetTenantsResponse } from "@/lib/queries/interfaces/tenant.interface";
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

// const subdomains = [
//   {
//     subdomain: "penesito.uagrm",
//   },
//   {
//     subdomain: "trabajos.dinos.uagrm",
//   },
//   {
//     subdomain: "autist.boy.uagrm"
//   },
//   {
//     subdomain: "rog.zephyrus.uagrm",
//   },
//   {
//     subdomain: "sprint2.hoy.uagrm"
//   }
// ]

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  const hostname = req.headers.get("host")!;
  const path = url.pathname;
  const cookie = req.cookies.get('user');
  const token = url.searchParams.get('oauth');
  const subdomainTest = hostname.split(".").slice(0, -1).join(".");

  console.log('>>>>>>>>>>>>>>>>>>>>',subdomainTest,cookie)

  if (!cookie && !token && subdomainTest ) {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }

  if(!cookie && !subdomainTest){
    return NextResponse.next();
  }

  let user: Data | null = null;
  if (cookie) {
    try {
      user = JSON.parse(cookie.value);
    } catch (error) {
      console.error('Error parsing cookie:', error);
      return NextResponse.rewrite(new URL('/unauthorized', req.url));
    }
  }

  const tokenToUse = user?.token || token;

  if (!tokenToUse) {
    return NextResponse.rewrite(new URL('/unauthorized', req.url));
  }


  const tenants: GetTenantsResponse = await getTenants(tokenToUse);

  // Define los dominios permitidos (localhost y dominio para producción)
  // Define allowed Domains (localhost and production domain)
  const allowedDomains = ["localhost:3001", "tudominio.com"];

  // Verificamos si el hostname existe en los dominios permitidos
  // Verify if hostname exist in allowed domains
  const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));


  // Extraemos el posible subdominio en la URL
  // Extract the possible subdomain in the URL
  const subdomain = hostname.split(".").slice(0, -1).join(".");


  console.log('========subdomain=========>', subdomain,tenants)


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
  const response = await fetch('http://localhost:3000/api/tenant/user', {
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

// import { NextRequest, NextResponse } from "next/server";
// import { GetTenantsResponse } from "@/lib/queries/interfaces/tenant.interface";
// import { Data } from "@/lib/queries/interfaces/auth.interface";
// import { headers } from "next/headers";

// export const config = {
//   matcher: [
//     /*
//     //  * Match all paths except for:
//     //  * 1. /api routes
//     //  * 2. /_next (Next.js internals)
//     //  * 3. /_static (inside /public)
//     //  * 4. all root files inside /public
//     */
//     "/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)",
//   ],
// };

// const allowedDomains = ["localhost:3001", "tudominio.com"];

// export default async function middleware(req: NextRequest) {
//   const url = req.nextUrl;
//   const hostname = req.headers.get("host")!;
//   const path = url.pathname;

//   // Extraemos el posible subdominio en la URL
//   const subdomain = hostname.split(".").slice(0, -1).join(".");

//   const cookie = req.cookies.get('user');
//   const tenantsCookie = req.cookies.get('tenants');

//   let tenants: GetTenantsResponse | null = null;

//   const tokens: Data = JSON.parse(cookie?.value!);
//   const USERD = req.cookies.get('token');
//   console.log('?????????', USERD)


//   if (tenantsCookie) {
//     tenants = JSON.parse(tenantsCookie.value);
//   } else if (cookie) {
//     const user: Data = JSON.parse(cookie.value);
//     tenants = await getTenants(user.token);

//     const response = NextResponse.next();
//     response.cookies.set('tenants', JSON.stringify(tenants), { path: '/', httpOnly: true, secure: true });
//     response.cookies.set('token', JSON.stringify(tokens), { path: '/', httpOnly: true, secure: true });

//     // Add the token to the headers
//     // response.headers.set('auth-token', user.token);

//     return response;
//   } else {
//     console.log(req)
//     return NextResponse.rewrite(new URL('/unauthorized', req.url));
//   }

//   const allTenants = tenants?.data.allTenants.map(tenant => tenant.tenant.hosting);
//   console.log('???????????????????????????????????', allTenants);
//   console.log('???????????????????????????????????', );


//   // Verificamos si el hostname existe en los dominios permitidos
//   const isAllowedDomain = allowedDomains.some(domain => hostname.includes(domain));

//   // Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
//   if (isAllowedDomain && !allTenants?.includes(subdomain)) {
//     if (path.startsWith('/dashboard')) {
//       return NextResponse.rewrite(new URL('/unauthorized', req.url));
//     }
//     return NextResponse.next();
//   }

//   const subdomainData = allTenants?.find(d => d === subdomain);

//   if (subdomainData) {
//     // Reescribe la URL a una ruta dinámica basada en el subdominio
//     return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url, {
//       headers: cookie
//     }));
//   }

//   return NextResponse.next();
// }

// const getTenants = async (token: string) => {
//   const response = await fetch('http://localhost:3000/api/tenant/user', {
//     headers: {
//       "auth-token": token
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json();
//   return data;
// }

