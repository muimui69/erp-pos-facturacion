"use client"

import { useSearchParams, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { postCreateBrandQuery } from "@/lib/queries/branch"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useRouter()

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: zodResolver(userAuthSchema),
  // })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const searchParams = useSearchParams()


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate.push('/dashboard')
  }

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    // const signInResult = await signIn("email", {
    //   email: data.email.toLowerCase(),
    //   redirect: false,
    //   callbackUrl: searchParams?.get("from") || "/dashboard",
    // })

    setIsLoading(false)

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your sign in request failed. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    return toast({
      title: "Check your email",
      description: "We sent you a login link. Be sure to check your spam too.",
    })
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Codigo
            </Label>
            <Input
              id="email"
              placeholder="codigo"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
            // {...register("email")}
            />
            {/* {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )} */}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Inicia sesion
          </button>
        </div>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={() => {
          setIsGitHubLoading(true)
          signIn("github")
        }}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button> */}
    </div>
  )
}
