"use client"

import { usePathname } from "next/navigation";


export const getQueryParams = () => {

  const searchParams = new URLSearchParams(window.location.search);
  const queryParams: Record<string, string> = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  return {
    queryParams
  };
}