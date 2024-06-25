"use client"
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function StockProduct() {
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
      

  const itemsPerPage = 2; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stockData.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = stockData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4 md:p-8 lg:p-10">
    <div className="grid gap-6">
      {currentItems.map((item) => (
        <Card key={item.id} className="grid gap-4 p-4 md:p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-md flex items-center justify-center aspect-square w-12 md:w-16">
              <PackageIcon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="grid gap-1">
              <h3 className="font-semibold text-lg md:text-xl">{item.productName}</h3>
              <div className="flex items-center gap-2 text-sm md:text-base">
                <GaugeIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span>Stock: {item.stockQuantity}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2 text-sm md:text-base">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{item.branchCity}</span>
            </div>
            <div className="flex items-center gap-2">
              <BuildingIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{item.branchName}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocateIcon className="w-4 h-4 md:w-5 md:h-5" />
              <span>{item.branchAddress}</span>
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

// los iconos, si quieres usas tu componentes de iconos cholo


function BuildingIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function GaugeIcon(props) {
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
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
