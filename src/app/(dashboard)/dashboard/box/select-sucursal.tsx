import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectBranchsProps {
  setUserBranch: (value: { idBranch: string }) => void;
}

const options = [
  { value: '1', label: 'Electrónica' },
  { value: '2', label: 'Ropa' },
  { value: '3', label: 'Hogar' },
  { value: '4', label: 'Juguetes' },
  { value: '5', label: 'Deportes' },
  { value: '6', label: 'Libros' },
  { value: '7', label: 'Videojuegos' },
  { value: '8', label: 'Música' },
  { value: '9', label: 'Películas' },
  { value: '10', label: 'Herramientas' },
  { value: '11', label: 'Jardinería' },
  { value: '12', label: 'Automotriz' },
  { value: '13', label: 'Salud' },
  { value: '14', label: 'Belleza' },
  { value: '15', label: 'Mascotas' },
  { value: '16', label: 'Oficina' },
  { value: '17', label: 'Cocina' },
  { value: '18', label: 'Comida y Bebidas' },
  { value: '19', label: 'Bebés' },
  { value: '20', label: 'Moda' },
  { value: '21', label: 'Viajes' },
  { value: '22', label: 'Educación' },
  { value: '23', label: 'Arte y Manualidades' },
  { value: '24', label: 'Fotografía' },
  { value: '25', label: 'Joyería' },
  { value: '26', label: 'Accesorios' },
  { value: '27', label: 'Calzado' },
  { value: '28', label: 'Religión' },
  { value: '29', label: 'Fiestas' },
  { value: '30', label: 'Papelería' },
  { value: '31', label: 'Instrumentos Musicales' },
  { value: '32', label: 'Juguetes Educativos' },
  { value: '33', label: 'Tecnología' },
  { value: '34', label: 'Gourmet' },
  { value: '35', label: 'Muebles' },
  { value: '36', label: 'Decoración' },
  { value: '37', label: 'Seguridad' },
  { value: '38', label: 'Camping' },
  { value: '39', label: 'Caza' },
  { value: '40', label: 'Pesca' },
  { value: '41', label: 'Relojes' },
  { value: '42', label: 'Vehículos' },
  { value: '43', label: 'Industrial' },
  { value: '44', label: 'Agrícola' },
  { value: '45', label: 'Construcción' },
  { value: '46', label: 'Inmobiliaria' },
  { value: '47', label: 'Finanzas' },
  { value: '48', label: 'Energía' },
  { value: '49', label: 'Telecomunicaciones' },
  { value: '50', label: 'Servicios' },
];

const SelectBranch: React.FC<SelectBranchsProps> = ({ setUserBranch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const handleChange = (value: string) => {
    setUserBranch({ idBranch: value });
  };

  return (
    <Select onValueChange={handleChange} >
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Seleccione una Sucursal" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        <div className="p-2 ">
          
          <input
            type="text"
            placeholder="Buscar sucursal..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="p-2 w-full border-b"
            
          />
        </div>
        {filteredOptions.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBranch;
