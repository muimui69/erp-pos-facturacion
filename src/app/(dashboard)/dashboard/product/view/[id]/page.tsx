import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StockProduct from "./stockProduct";

export default function PageView() {
  const product = {
    name: "Yogurt de Frutilla",
    description: "Yogurt de la empresa de Pil con trozos de frutilla",
    price: 99.99,
    inventory: ["Frutas", "lacteos", "Electronico"]
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto py-8 px-4">
      <div>
        <img
          src="https://pilandina.com.bo/wp-content/uploads/2019/06/xYogurt-Frutado-con-frutilla-en-trozos-750g-600x600.jpg.pagespeed.ic.9f0ExTe7dB.jpg"
          alt="Product Image"
          width={600}
          height={600}
          className="w-full h-auto max-w-md md:max-w-full rounded-lg overflow-hidden"
        />
      </div>
      <div className="grid gap-6">
        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Detalles del Producto</TabsTrigger>
            <TabsTrigger value="stock">Stock del Producto</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="mt-6 bg-background rounded-lg shadow-lg overflow-hidden w-full max-w-full md:max-w-sm">
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {product.inventory.map((item, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-3 py-1 rounded-full text-xs font-medium text-secondary-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-3xl font-bold">{product.price} Bs</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="stock">
            <div className="grid gap-4">
              <StockProduct />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
