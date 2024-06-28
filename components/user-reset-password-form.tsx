"use client"

import Cookie from 'js-cookie';
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { useParamsClient } from '@/hooks/use-params';


interface UserSigninFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface Userdata {
  password: string;
  password_update: string;
}

export function UserResetPasswordForm({ className, ...props }: UserSigninFormProps) {
  const navigate = useRouter()
  const { subdomain, user } = useParamsClient()
  const { patchPasswordTenantUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<Userdata>({
    password: '',
    password_update: ''
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
      const response = await patchPasswordTenantUser.mutateAsync({
        subdomain: subdomain as never,
        serviceToken: user?.token!,
        password: {
          password: userData.password,
          password_update: userData.password_update
        }
      });
      const userDataRepomse = response.data.data;
      const data = JSON.stringify(userDataRepomse);
      Cookie.set('user', data);
      navigate.push('/dashboard');
      setIsLoading(false);
      return toast({
        title: "Cambios actualizados correctamente ! ",
      })
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return toast({
        title: "Ha ocurrido un error",
        description: "Verifique que las contrasenias actual y nueva sean los correctos",
        variant: "destructive"
      })
    }
  }


  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="password">
              Contraseña actual:
            </Label>
            <Input
              id="password"
              placeholder="*******"
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

            <Label htmlFor="password_update">
              Contraseña nueva:
            </Label>

            <Input
              id="password"
              placeholder="******"
              name="password_update"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              value={userData.password_update}
            />

          </div>

          <Button
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reestablecer contraseña
          </Button>
        </div>
      </form>
    </div>
  )
}
