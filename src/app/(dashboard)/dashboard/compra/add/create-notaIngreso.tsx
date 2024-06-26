"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SelectProvider } from "./select-Provider";
import { SelectBranch } from "./select-Branch";
import { SelectProduct } from "./select-Product";
import { useRouter } from "next/router";


export default function AddNotePage() {
  const [providerId, setProviderId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [products, setProducts] = useState([{ productId: "", cant: "", price: "" }]);

  const handleProductChange = (index, key, value) => {
    const newProducts = [...products];
    newProducts[index][key] = value;
    setProducts(newProducts);
  };

  const handleAddProduct = () => {
    setProducts([...products, { productId: "", cant: "", price: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      providerId,
      branchId,
      products: products.map(product => ({
        productId: parseInt(product.productId),
        cant: parseInt(product.cant),
        price: parseFloat(product.price)
      }))
    };

    // Aquí realizarías la llamada a la API para enviar el 'note' a tu backend
    console.log("Submitting note:", note);
  };
  const HandleCancel=()=>{

  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Crear una nueva Entrada de Nota</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Proveedor y Sucursal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Proveedor
                </label>
                <SelectProvider value={providerId} onChange={setProviderId} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sucursal
                </label>
                <SelectBranch value={branchId} onChange={setBranchId} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            {products.map((product, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Producto
                  </label>
                  <SelectProduct
                    value={product.productId}
                    onChange={(value) => handleProductChange(index, "productId", value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cantidad
                  </label>
                  <Input
                    type="number"
                    name="cant"
                    value={product.cant}
                    onChange={(e) => handleProductChange(index, "cant", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
                  <Input
                    type="number"
                    name="price"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, "price", e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleRemoveProduct(index)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Añadir Producto
            </Button>
          </CardContent>
        </Card>
        <Button type="submit" variant="primary">
          Enviar Nota
        </Button>
        <Button variant="outline" type="submit" onClick={HandleCancel} className="mr-2">
  Cancelar
</Button>
      </form>
    </div>
  );
}
