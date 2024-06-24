import Link from "next/link";
import { Icons } from "./icons";


export default function LayoutEmptyCustom({ title, path }: { title: string, path?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-background">
            <div className="max-w-xl p-6 rounded-lg  bg-card">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Icons.packageOpenIcon className="w-12 h-12 text-primary" />
                    <h2 className="md:text-2xl  sm:text-xl font-bold">¡Aún no tiene {title}s!</h2>
                    {
                        !path &&
                        <p className="text-muted-foreground">Haga clic en el  <strong>botón de arriba</strong> para crear su primer {title}.</p>
                    }
                    {
                        path &&
                        <>
                            <p className="text-muted-foreground text-xs md:text-xl">
                                <strong>
                                    <Link className="underline" href={path}>
                                        Haga clic aqui {" "}
                                    </Link>
                                </strong>
                                {" "}para crear su primer {title}.
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

