import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import "@/src/app/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from "@/config/site"
import ProviderUseReactQuery from "@/provider/ReactQueryClient"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProviderPos } from "@/context/theme-context"
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],

  openGraph: {
    type: "website",
    locale: "en_ES",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },

}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ProviderUseReactQuery>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeProviderPos>
              <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                {children}
              </AppRouterCacheProvider>
            </ThemeProviderPos>
          </ThemeProvider>
          <Toaster />
        </ProviderUseReactQuery>
      </body>
    </html>
  )
}
