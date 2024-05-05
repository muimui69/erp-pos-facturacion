"use client"

import { useRouter } from "next/navigation"

import { cn, createSubdomainUrl, createUrl } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
// import { postCreateBrandQuery } from "@/lib/queries/branch"


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


interface Userdata {
  codigo: string;
  espacio_de_trabajo: string;
}

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

  const [userData, setUserData] = useState<Userdata>({
    codigo: '',
    espacio_de_trabajo: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // navigate.push('/dashboard')

    const { espacio_de_trabajo, ...rest } = userData;
    const subdomainUrl = createSubdomainUrl(espacio_de_trabajo, rest);
    navigate.replace(subdomainUrl);
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

            <Label className="sr-only" htmlFor="codigo">
              Codigo
            </Label>
            <Input
              id="codigo"
              placeholder="codigo"
              name="codigo"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              onChange={handleChange}
              value={userData.codigo}
            />
          </div>

          <div className="grid gap-1">

            <Label className="sr-only" htmlFor="espacio_de_trabajo">
              Espacio de trabajo
            </Label>

            <Input
              id="espacio_de_trabajo"
              placeholder="espacio de trabajo"
              name="espacio_de_trabajo"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
              onChange={handleChange}
              value={userData.espacio_de_trabajo}
            />
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
