import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import storeConfig from '../config/store.json';

export function Cart() {
  const { items, removeItem, clearCart, total } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMercadoPago = () => {
    // Here you would integrate with Mercado Pago SDK
    alert(`Alias para transferencia: ${storeConfig.store.mercadoPago.alias}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tu Pedido</h3>
          
          {items.length === 0 ? (
            <p className="text-gray-600">Tu carrito está vacío</p>
          ) : (
            <>
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-start mb-4 pb-4 border-b">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.containerName}</h4>
                    <div className="text-sm text-gray-600">
                      {item.flavors.map(f => f.name).join(', ')}
                    </div>
                    <div className="text-pink-600 font-medium">${item.price}</div>
                  </div>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
              
              <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span>Total:</span>
                <span>${total()}</span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleMercadoPago}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Pagar con Mercado Pago
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}