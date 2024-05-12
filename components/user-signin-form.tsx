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


interface UserSigninFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface Userdata {
  email: string;
  password: string;
}

export function UserSigninForm({ className, ...props }: UserSigninFormProps) {
  const navigate = useRouter()
  const { signinUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<Userdata>({
    email: '',
    password: ''
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
      const response = await signinUser.mutateAsync(userData);
      const user = response.data.data;
      const data = JSON.stringify(user);
      Cookie.set('user', data);
      navigate.push('/');
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
