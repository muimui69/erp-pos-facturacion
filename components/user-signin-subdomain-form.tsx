"use client"

import Cookie from 'js-cookie';
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { useAuth } from "@/hooks/use-auth"


interface UserSigninFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface Userdata {
  email: string;
  password: string;
  workspace: string;
}

export function UserSigninSubdomainForm({ className, ...props }: UserSigninFormProps) {
  const navigate = useRouter()
  const { signinTenantUser } = useAuth();
  const searchParams = useSearchParams()

  const searchParamEmail = searchParams.get('email')
  const searchParamWorkspace = searchParams.get('workspace')


  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<Userdata>({
    email: searchParamEmail || '',
    password: '',
    workspace: searchParamWorkspace || ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await signinTenantUser.mutateAsync({
        subdomain: searchParamWorkspace as never,
        user: {
          email: userData.email,
          password: userData.password
        }
      });
      const user = response.data.data;
      const data = JSON.stringify(user);
      Cookie.set('user', data);
      navigate.push('/dashboard');
      setIsLoading(false);
      return toast({
        title: `Bienvenido de vuelta ${response.data.data.user.name} ${String.fromCodePoint(128079)}!`,
      })
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return toast({
        title: "Ha ocurrido un error",
        description: "Verifique que su correo y contraseña sean los correctos",
        variant: "destructive"
      })
    }
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">
              Correo:
            </Label>
            <Input
              id="email"
              placeholder="name@gmail.com"
              name="email"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              value={userData.email}
            />
          </div>

          <div className="grid gap-1 py-2">

            <Label htmlFor="password">
              Contraseña:
            </Label>

            <Input
              id="password"
              placeholder="******"
              name="password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              value={userData.password}
            />

          </div>
          <div className="grid gap-1 py-2">

            <Label htmlFor="workespace">
              Espacio de trabajo:
            </Label>
            <Input
              id="workespace"
              placeholder="tu.espacio.de.trabajo"
              name="workespace"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={true}
              onChange={handleChange}
              value={userData.workspace}
            />
          </div>

          <Button
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar sesion
          </Button>
        </div>
      </form>
    </div>
  )
}
