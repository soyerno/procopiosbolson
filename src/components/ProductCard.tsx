import React from 'react';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  featured: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function ProductCard({ 
  image, 
  name, 
  description, 
  price, 
  category,
  featured,
  onSelect,
  disabled 
}: ProductCardProps) {
  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden
      transform transition-all duration-300
      ${disabled ? 'opacity-50' : 'hover:scale-105'}
      ${featured ? 'ring-2 ring-pink-400 ring-offset-2' : ''}
    `}>
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        {featured && (
          <span className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
            Destacado
          </span>
        )}
        <span className="absolute top-2 left-2 bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-pink-600 font-bold">${price}</span>
          <button
            onClick={onSelect}
            disabled={disabled}
            className={`
              px-4 py-2 rounded-full flex items-center gap-2 transition-colors
              ${disabled 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'}
            `}
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}