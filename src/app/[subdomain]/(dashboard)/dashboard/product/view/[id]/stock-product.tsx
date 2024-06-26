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
  const stockData = [
    {
      id: 1,
      productName: "Yogurt de Frutilla",
      stockQuantity: 50,
      branchName: "Downtown Store",
      branchCity: "New York",
      branchAddress: "123 Main St, New York, NY 10001",
    },
    {
      id: 2,
      productName: "Laptop Backpack",
      stockQuantity: 25,
      branchName: "Uptown Outlet",
      branchCity: "New York",
      branchAddress: "456 Park Ave, New York, NY 10002",
    },
    {
      id: 3,
      productName: "Desk Lamp",
      stockQuantity: 75,
      branchName: "Suburban Showroom",
      branchCity: "Los Angeles",
      branchAddress: "789 Oak St, Los Angeles, CA 90001",
    },
    {
      id: 4,
      productName: "Bluetooth Speaker",
      stockQuantity: 30,
      branchName: "Coastal Branch",
      branchCity: "San Diego",
      branchAddress: "321 Beach Blvd, San Diego, CA 92101",
    },
    {
      id: 5,
      productName: "Smartphone",
      stockQuantity: 100,
      branchName: "Tech Hub",
      branchCity: "San Francisco",
      branchAddress: "123 Silicon Ave, San Francisco, CA 94016",
    },
    {
      id: 6,
      productName: "Wireless Charger",
      stockQuantity: 200,
      branchName: "Gadget Center",
      branchCity: "Austin",
      branchAddress: "456 Tech St, Austin, TX 73301",
    },
    {
      id: 7,
      productName: "Smartwatch",
      stockQuantity: 150,
      branchName: "Wearables Store",
      branchCity: "Seattle",
      branchAddress: "789 Digital Rd, Seattle, WA 98101",
    },
    {
      id: 8,
      productName: "Tablet",
      stockQuantity: 120,
      branchName: "Mobile World",
      branchCity: "Chicago",
      branchAddress: "321 Mobile Blvd, Chicago, IL 60601",
    },
    {
      id: 9,
      productName: "Gaming Console",
      stockQuantity: 80,
      branchName: "Gaming Hub",
      branchCity: "Las Vegas",
      branchAddress: "123 Gamer Ln, Las Vegas, NV 89101",
    },
    {
      id: 10,
      productName: "VR Headset",
      stockQuantity: 60,
      branchName: "Virtual Reality Store",
      branchCity: "Miami",
      branchAddress: "456 VR Ave, Miami, FL 33101",
    },
    {
      id: 11,
      productName: "Fitness Tracker",
      stockQuantity: 110,
      branchName: "Health Tech",
      branchCity: "Denver",
      branchAddress: "789 Fitness St, Denver, CO 80201",
    },
    {
      id: 12,
      productName: "Smart Home Hub",
      stockQuantity: 70,
      branchName: "Home Automation",
      branchCity: "Portland",
      branchAddress: "321 SmartHome Blvd, Portland, OR 97201",
    },
  ];


  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stockData.length / itemsPerPage);
  const [selectedValues, setSelectedValues] = useState<Branchs[]>([])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = stockData.slice(startIndex, startIndex + itemsPerPage);

  const { subdomain, user } = useParamsClient();
  const { createBranchProduct, branchsInProduct, isLoadingBranchInProduct } = useStocks(subdomain as never, user?.token, params.id.toString());
  console.log(branchsInProduct)
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        {branchsInProduct.map((item) => (
          <Card key={item.branch.id} className="grid gap-4 p-4 md:p-8 rounded-lg shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12 md:w-16">
                <Icons.package className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="grid gap-1">
                <h3 className="font-semibold text-lg md:text-xl">{item.branch.name}</h3>
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


