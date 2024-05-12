"use client"

import Cookie from 'js-cookie';
import { usePathname, useRouter, useSearchParams,useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { Data } from '@/lib/queries/interfaces/auth.interface';
import { useSuscriptions } from '@/hooks/use-suscription';


interface UserPaynamentFormProps extends React.HTMLAttributes<HTMLDivElement> { }

interface PaynamentData {
  suscription_name: string;
  hosting: string;
}

export function UserPaynamentForm({ className, ...props }: UserPaynamentFormProps) {
  const navigate = useRouter()
  const { createSuscription } = useSuscriptions();

  const searchParams = useSearchParams()
 
  const searchParamId = searchParams.get('id')
  const searchParamName = searchParams.get('name')

  console.log('-------------------',searchParamId,searchParamName)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [paynamentData, setPaynamentData] = useState<PaynamentData>({
    suscription_name: searchParamName || '',
    hosting: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPaynamentData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const userString = Cookie.get('user')!;
      const { token } = JSON.parse(userString) as Data;
      const response = await createSuscription.mutateAsync({
        token, suscription: {
          hosting: paynamentData.hosting,
          suscriptionId: parseInt(searchParamId!)
        }
      });
      navigate.push('/dashboard');
      setIsLoading(false);
      return toast({
        title: `Gracias por su compra ${response.data.data.user.name} ${String.fromCodePoint(128079)}!`,
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

            <Label htmlFor="hosting">
              Nombre para el espacio de trabajo:
            </Label>
            <Input
              id="hosting"
              placeholder="tu.espacio.de.trabajo"
              name="hosting"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              onChange={handleChange}
              value={paynamentData.hosting}
            />
          </div>

          <div className="grid gap-1 py-2">

            <Label htmlFor="password">
              Suscripcion seleccionada:
            </Label>

            <Input
              id="password"
              placeholder="sucription"
              name="password"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={true}
              onChange={handleChange}
              value={paynamentData.suscription_name}
            />

          </div>

          <Button
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Inicia sesion
          </Button>
        </div>
      </form>
    </div>
  )
}
