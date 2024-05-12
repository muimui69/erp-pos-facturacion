"use client"

import { useRouter } from "next/navigation"

import { cn, createSubdomainUrl, createUrl } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { useAuth } from "@/hooks/use-auth"


interface UserSignupFormProps extends React.HTMLAttributes<HTMLDivElement> { }


interface Userdata {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export function UserSignupForm({ className, ...props }: UserSignupFormProps) {
  const navigate = useRouter()
  const { signupUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [userData, setUserData] = useState<Userdata>({
    name: '',
    phone: '',
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
      const response = await signupUser.mutateAsync(userData);
      navigate.push('/login');
      setIsLoading(false);
      return toast({
        title: `Bienvenido a PointSync ${response.data.data.user.name} ${String.fromCodePoint(128079)}!`,
      })
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return toast({
        title: "Ha ocurrido un error",
        description: "Verifique que lleno todos los campos correctamente",
        variant: "destructive"
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="name">
              Nombre:
            </Label>
            <Input
              id="name"
              placeholder="joaquin chumacero"
              name="name"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              value={userData.name}
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="phone">
              Telefono:
            </Label>
            <Input
              id="phone"
              placeholder="88888888"
              name="phone"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={handleChange}
              value={userData.phone}
            />
          </div>
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

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}
