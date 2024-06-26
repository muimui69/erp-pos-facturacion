"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Page() {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // Number of cards per page

    const handleClick = () => {
        window.location.href = "/dashboard/compra/add";
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // Dummy data for demonstration
    const data = [
        {
            branch: "Branch A",
            supplier: "ABC Inc.",
            products: [
                { name: "Product A", stock: 50, price: "$19.99" },
                { name: "Product B", stock: 25, price: "$29.99" },
                { name: "Product C", stock: 75, price: "$14.99" },
                { name: "Product D", stock: 100, price: "$9.99" }
            ]
        },
        {
            branch: "Branch B",
            supplier: "XYZ Corp.",
            products: [
                { name: "Product E", stock: 30, price: "$24.99" },
                { name: "Product F", stock: 45, price: "$34.99" },
                { name: "Product G", stock: 60, price: "$19.99" },
                { name: "Product H", stock: 80, price: "$14.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        },
        {
            branch: "Branch C",
            supplier: "Acme Inc.",
            products: [
                { name: "Product I", stock: 20, price: "$39.99" },
                { name: "Product J", stock: 35, price: "$29.99" },
                { name: "Product K", stock: 55, price: "$24.99" },
                { name: "Product L", stock: 70, price: "$19.99" }
            ]
        }
    ];

    // Calculate the start and end indexes based on the currentPage and pageSize
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the data array to get the current page's data
    const currentPageData = data.slice(startIndex, endIndex);

    return (
        <div className="container mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Entradas de Nota</h1>
                <Button size="sm" onClick={handleClick}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Crear una nueva Entrada de Nota
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPageData.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{item.branch}</CardTitle>
                            <CardDescription>Supplier: {item.supplier}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {item.products.map((product, idx) => (
                                    <div key={idx}>
                                        <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-muted-foreground">Stock:</span>{" "}
                                                <span className="font-medium">{product.stock}</span>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Price:</span>{" "}
                                                <span className="font-medium">{product.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                    className="mr-2"
                >
                    Prev
                </Button>
                <Button
                    variant="outline"
                    disabled={currentPage * pageSize >= data.length}
                    onClick={handleNextPage}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

function PlusIcon(props) {
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
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    );
}
