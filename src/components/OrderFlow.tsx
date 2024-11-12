import React, { useState } from 'react';
import { ShoppingCart, IceCream, Plus, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import storeConfig from '../config/store.json';
import SendOrderWhatsApp from './SendOrderWhatsApp';
import OpenMercadoPagoPayment from './OpenMercadoPagoPayment';

// Tipo para los detalles del pedido
interface OrderDetails {
  customerName: string;
  orderDescription: string;
  orderTotal: number;
}

// Tipo para los detalles del pago
interface PaymentDetails {
  accountId: string;
  paymentAmount: number;
  paymentReference: string;
}

async function createPaymentIntention(){
  const res = await fetch('https://backend-de-la-tienda.com/api/modo-checkout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({price: 77 })
      }  
  );
 
  const jsonRes = await res.json();
  return {
    checkoutId: jsonRes.id,
    qrString: jsonRes.qr,
    deeplink: jsonRes.deeplink,
  };
}


async function showModal() {
  const modalData = await createPaymentIntention();
  const modalObject = {
      qrString: modalData.qrString,
      checkoutId: modalData.checkoutId,
      deeplink:  {
          url: modalData.deeplink,
          callbackURL: 'https://tiendadeprueba.com/checkout',
          callbackURLSuccess: 'https://tiendadeprueba/thankyou'
      },
      callbackURL: 'https://tiendadeprueba/thankyou',
      refreshData: createPaymentIntention,
      onSuccess: function () { console.log('onSuccess') },
      onFailure: function () { console.log('onFailure') },
      onCancel: function () { console.log('onCancel') },
      onClose: function () { console.log('onClose') },
  }


  globalThis.ModoSDK.modoInitPayment(modalObject);
}

export function OrderFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(storeConfig.containers[0]);
  const [selectedFlavors, setSelectedFlavors] = useState<typeof storeConfig.flavors[0][]>([]);
  const { items, addItem, removeItem, clearCart, total } = useCartStore();

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
      // setIsOpen(false);
    }
  };

  // const handleMercadoPago = () => {
  //   alert(`Alias para transferencia: ${storeConfig.store.mercadoPago.alias}`);
  // };

  const isFlavorSelected = (flavorId: number) => 
    selectedFlavors.some(f => f.id === flavorId);

  const orderDetails: OrderDetails = {
    customerName: 'Juan Pérez',
    orderDescription: '1 Helado de Chocolate, 1 Helado de Vainilla',
    orderTotal: 15,
  };

  const paymentDetails: PaymentDetails = {
    accountId: 'soyerno.mp',
    paymentAmount: 25000,
    paymentReference: 'MP123456789',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl p-4 flex items-center justify-between group hover:opacity-90 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <IceCream className="w-6 h-6" />
          <div className="text-left">
            <div className="font-semibold text-lg">Hacer Pedido</div>
            <div className="text-sm opacity-90">Elige tus sabores favoritos</div>
          </div>
        </div>
        <Plus className="w-5 h-5 transform group-hover:rotate-45 transition-transform" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Hacer Pedido</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Container Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Elige tu presentación</h3>
                <div className="grid grid-cols-3 gap-3">
                  {storeConfig.containers.map((container) => (
                    <button
                      key={container.id}
                      onClick={() => {
                        setSelectedContainer(container);
                        setSelectedFlavors([]);
                      }}
                      className={`
                        p-3 rounded-xl text-left text-sm
                        ${selectedContainer.id === container.id
                          ? 'bg-pink-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'}
                      `}
                    >
                      <div className="font-semibold">{container.name}</div>
                      <div className="opacity-90">${container.price}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Elige tus sabores ({selectedFlavors.length}/{selectedContainer.flavors})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {storeConfig.flavors.map((flavor) => (
                    <button
                      key={flavor.id}
                      onClick={() => handleFlavorSelect(flavor)}
                      disabled={isFlavorSelected(flavor.id) || 
                        (selectedFlavors.length >= selectedContainer.flavors && !isFlavorSelected(flavor.id))}
                      className={`
                        p-3 rounded-xl text-left text-sm flex items-start gap-3
                        ${isFlavorSelected(flavor.id)
                          ? 'bg-purple-600 text-white'
                          : selectedFlavors.length >= selectedContainer.flavors
                          ? 'bg-gray-100 opacity-50 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200'}
                      `}
                    >
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <div className="font-semibold">{flavor.name}</div>
                        <div className="opacity-90 text-xs">{flavor.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedFlavors.length === selectedContainer.flavors && (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700"
                >
                  Agregar al carrito
                </button>
              )}

              {/* Cart */}
              {items.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-3">Tu Pedido</h3>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between items-start bg-gray-50 p-3 rounded-lg">
                        <div>
                          <div className="font-semibold">{item.containerName}</div>
                          <div className="text-sm text-gray-600">
                            {item.flavors.map(f => f.name).join(', ')}
                          </div>
                          <div className="text-pink-600 font-medium">${item.price}</div>
                        </div>
                        <button
                          onClick={() => removeItem(index)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span>Total:</span>
                      <span>${total()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                
                {items.length > 0 && (
                  <>
                    <button
                      // onClick={handleMercadoPago}
                      className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600"
                    >
                      Pagar con transferencia: {storeConfig.store.mercadoPago.alias}
                    </button>
                    <SendOrderWhatsApp orderDetails={orderDetails} />
                    <button onClick={()=>showModal()}>Pagá con MODO</button>
                    <OpenMercadoPagoPayment paymentDetails={paymentDetails} />
                    <button
                      onClick={clearCart}
                      className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300"
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {items.length > 0 && !isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {items.length}
          </span>
        </button>
      )}
    </>
  );
}