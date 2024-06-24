import { Icons } from "@/components/icons"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Icons.confirmation className="text-green-500 size-12" />
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Congratulations!</h1>
          <p className="text-muted-foreground">
            Thank you for completing the form. We appreciate your time and look forward to connecting with you.
          </p>
        </div>
        <div>
          <Link
            href="/tenants"
            className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Ir a su espacio de trabajo
          </Link>
        </div>
      </div>
    </div>
  )
}

