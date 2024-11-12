import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { useCartStore } from '../store/useCartStore';
import storeConfig from '../config/store.json';

export function OrderSection() {
  const [selectedContainer, setSelectedContainer] = useState(storeConfig.containers[0]);
  const [selectedFlavors, setSelectedFlavors] = useState<typeof storeConfig.flavors[0][]>([]);
  const { addItem } = useCartStore();

  const handleFlavorSelect = (flavor: typeof storeConfig.flavors[0]) => {
    if (selectedFlavors.length < selectedContainer.flavors) {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const handleAddToCart = () => {
    if (selectedFlavors.length === selectedContainer.flavors) {
      addItem({
        containerId: selectedContainer.id,
        containerName: selectedContainer.name,
        price: selectedContainer.price,
        flavors: selectedFlavors.map(f => ({ id: f.id, name: f.name }))
      });
      setSelectedFlavors([]);
    }
  };

  const isFlavorSelected = (flavorId: number) => 
    selectedFlavors.some(f => f.id === flavorId);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Elige tu presentación</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {storeConfig.containers.map((container) => (
            <button
              key={container.id}
              onClick={() => {
                setSelectedContainer(container);
                setSelectedFlavors([]);
              }}
              className={`
                p-6 rounded-xl transition-all duration-300 text-left
                ${selectedContainer.id === container.id
                  ? 'bg-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white hover:bg-pink-50 text-gray-700'}
              `}
            >
              <div className="font-bold text-lg mb-1">{container.name}</div>
              <div className="text-sm mb-2 opacity-90">{container.description}</div>
              <div className="font-bold text-lg">${container.price}</div>
              <div className="text-sm mt-2 opacity-90">
                {container.flavors} {container.flavors === 1 ? 'sabor' : 'sabores'}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Elige tus sabores ({selectedFlavors.length}/{selectedContainer.flavors})
          </h2>
          {selectedFlavors.length === selectedContainer.flavors && (
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors text-lg font-semibold"
            >
              Agregar al carrito
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeConfig.flavors.map((flavor) => (
            <ProductCard
              key={flavor.id}
              {...flavor}
              onSelect={() => handleFlavorSelect(flavor)}
              disabled={isFlavorSelected(flavor.id) || 
                (selectedFlavors.length >= selectedContainer.flavors && !isFlavorSelected(flavor.id))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}