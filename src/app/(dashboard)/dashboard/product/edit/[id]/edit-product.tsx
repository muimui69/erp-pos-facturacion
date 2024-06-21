"use client"
import * as React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectCa } from "./select-category"; 
import { Product } from "@/types/product";// Asegúrate de que la ruta es correcta
// Asegúrate de que la ruta es correcta

const EditProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  const [product, setProduct] = React.useState<Product | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>(undefined);

  React.useEffect(() => {
    // Fetch product data by ID
    const fetchProduct = async () => {
      const response = await fetch(`/api/products/${id}`);
      const data: Product = await response.json();
      setProduct(data);
      setImagePreview(data.photo);
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(undefined);
      setImagePreview(undefined);
    }
  };
  const handleRemoveImage = () => {
    setSelectedFile(undefined);
    setImagePreview(undefined);
  };
  const handleSave = async () => {
    // Implement save logic here
    // Send updated product data to the server
    // Redirect or show success message
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4">
        <div className="bg-muted rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Editar Producto</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
           
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 fill-muted-foreground" />
              <span>Product</span>
            </div>
          </div>
        </div>
        <div className="bg-background border rounded-lg overflow-hidden">
        {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Product Image Preview"
                className="w-full h-64 object-cover"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                X
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-64 bg-gray-200 text-gray-400">
              No image selected
            </div>
          )}
          <div className="p-4">
            <label htmlFor="fileInput" className="block mb-2 cursor-pointer">
              <UploadIcon className="w-6 h-6 mr-1 inline" />
              Seleccione una Imagen para su Producto
            </label>
            <Input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
       
      </div>
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="bg-background border rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Detalles del Producto</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-base">
                Nombre
              </Label>
              <Input
                id="name"
                placeholder="Introduzca el nombre del Producto"
                defaultValue={product.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-base">
                Descripcion
              </Label>
              <Textarea
                id="description"
                placeholder="Introduzca la Descripcion del Producto"
                className="min-h-[100px]"
                defaultValue={product.description}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price" className="text-base">
                Precio
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Introduzca el precio"
                defaultValue={product.price}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-base">
                Categoria
              </Label>
              <SelectCa  />
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-2 flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.back()}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </div>
    </div>
  );
};

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

const ClockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
};

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
};

export default EditProductPage;
