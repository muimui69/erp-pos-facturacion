import { type ClassValue, clsx } from "clsx"
import { ReadonlyURLSearchParams } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { Params } from "@/lib/constants";
import { NextRequest } from "next/server";

interface SubadomainsParams {
  [key: string]: string;
};

interface UrlParamsPathname {
  [key: string]: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_LOCALHOST_APP_URL}${path}`
}

// export const getValidSubdomain = (host?: string | null) => {
//   let subdomain: string | null = null;

//   if (!host && typeof window !== 'undefined') {
//     host = window.location.host;
//   }

//   if (host && host.includes('.')) {
//     const candidate = host.split('.')[0];
//     if (candidate && !candidate.includes('localhost')) {
//       subdomain = candidate;
//     }
//   }
//   return subdomain;
// };

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const createSubdomainUrl = (workspace: string, input: object | object[]): string => {
  const subadomainsParams: SubadomainsParams = {};

  const keys = Object.keys(input);
  const values = Object.values(input);

  keys.forEach((key, index) => {
    subadomainsParams[key.toLowerCase()] = values[index];
  });

  const subdomainUrl = createUrl(
    `${workspace}/oauth`,
    new URLSearchParams(subadomainsParams)
  );

  return subdomainUrl;
}

export const createUrlParams = (pathname: string, input: object | object[]): string => {
  const urlParamsPathname: UrlParamsPathname = {};

  const keys = Object.keys(input);
  const values = Object.values(input);

  keys.forEach((key, index) => {
    urlParamsPathname[key.toLowerCase()] = values[index];
  });

  const urlParams = createUrl(
    `/${pathname}`,
    new URLSearchParams(urlParamsPathname)
  );

  return urlParams;
}

export const getCurrentSubdomain = (req: Params) => {
  const { subdomain } = req.params;
  return subdomain;
}



