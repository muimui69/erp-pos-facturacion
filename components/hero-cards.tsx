import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
// import img_team from "@/assets/img/team.jpg"
import img_team from "@/assets/img/team_two.png"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export default function HeroCards() {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">

      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe React</CardTitle>
            <CardDescription>@joaquin_chumacero</CardDescription>
          </div>
        </CardHeader>

        <CardContent>Pointsync aumentó nuestras ventas!!</CardContent>
      </Card>

      <Card className="absolute right-[20px] -top-10 w-80  flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <div className="aspect-square">
          <Image
            src={img_team}
            alt="team"
            layout="responsive"
            priority
          />
        </div>
      </Card>


      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Gratis
            <Badge
              className="text-sm text-primary bg-yellow-300 dark:text-black"
            >
              Popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">Bs 0</span>
            <span className="text-muted-foreground">/mes</span>
          </div>

          <CardDescription>
            Caracteristicas basicas para tu punto de venta.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link href="/contact" className={cn(buttonVariants({ size: "lg" }))}>
            Empieza tu prueba gratuita
          </Link>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["4 Miembros de equipo", "4 GB de espacio", "Acceso a modulos basicos"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-green-300 p-1 rounded-2xl">
            <Icons.sunMoon className="h-12 w-12 dark:text-black" />
          </div>
          <div>
            <CardTitle>Modo claro y oscuro</CardTitle>
            <CardDescription className="text-md mt-2">
              Disfrute de estos beneficios de personalizacion en su punto de venta.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};