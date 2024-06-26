"use client"
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Label } from '@radix-ui/react-label';
import { SelectBranch } from './select-branch';
import { useParamsClient } from '@/hooks/use-params';
import { useBranchs } from '@/hooks/use-branch';
import { useProducts } from '@/hooks/use-product';
import { toast } from '@/components/ui/use-toast';
import { useStocks } from '@/hooks/use-stock';

interface Branchs {
  id: number;
  name: string;
}

interface EditProductProps {
  params: {
    id: number;
  }
}

export default function StockProduct({ params }: EditProductProps) {
 

  const { subdomain, user } = useParamsClient();
  const { createBranchProduct, branchsInProduct, isLoadingBranchInProduct } = useStocks(subdomain as never, user?.token, params.id.toString());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(branchsInProduct.length / itemsPerPage);
  const [selectedValues, setSelectedValues] = useState<Branchs[]>([])

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = branchsInProduct.slice(startIndex, startIndex + itemsPerPage);


  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const branchIds = selectedValues.map(branch => branch.id) ;
      await createBranchProduct.mutateAsync({
        serviceToken: user?.token as never,
        subdomain: subdomain as never,
        branchIds: {
          branchIds: branchIds,
        },
        id: params?.id as never
      });
      // navigate.push("/dashboard/product")
      setIsLoading(false);
      toast({
        description: "Sucursales añadidas correctamente creado correctamente"
      })
    } catch (err) {
      console.error("Error creando el Producto", err);
      setIsLoading(false);
      toast({
        description: "No se añadio sucursale. Intente de nuevo",
        variant: "destructive"
      })
    }
  }

  if (isLoadingBranchInProduct) {
    return <span>Cargando ...</span>
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <div className="grid gap-2">

        <Label className="text-base">
          Sucursales
        </Label>
        <SelectBranch setUserCategory={setSelectedValues} params={params} />
        <div className="flex justify-end gap-2 mb-10">
          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            type="button">
            Guardar
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {currentItems.map((item) => (
          <Card key={item.branch.id} className="grid gap-4 p-4 md:p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12 md:w-16">
                <Icons.package className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold text-lg md:text-xl">Sucursal: {item.branch.name}</h3>
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Icons.gauge className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Stock: {item.cant}</span>
                </div>
              </div>
            </div>
            <div className="grid gap-2 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Icons.mapPinned className="w-4 h-4 md:w-5 md:h-5" />
                <span>{item.branch.city.name}</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Icons.building className="w-4 h-4 md:w-5 md:h-5" />
                <span>{item.branch.address}</span>
              </div> */}
              <div className="flex items-center gap-2">
                <Icons.locate className="w-4 h-4 md:w-5 md:h-5" />
                <span>{item.branch.address}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-6 max-w-sm mx-auto">
        <Button
          className="px-4 py-2"
          variant="outline"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <Icons.chevronLeft />
        </Button>
        <span className="px-4 py-2 rounded-md">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          className="px-4 py-2"
          variant="outline"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <Icons.chevronRight />
        </Button>
      </div>
    </div>
  );
}


