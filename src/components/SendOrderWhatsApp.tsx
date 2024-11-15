import React from 'react';
import storeConfig from '../config/store.json';

// Definimos los tipos de las props
interface OrderDetails {
  customerName: string;
  orderDescription: string;
  orderTotal: number;
}

interface SendOrderWhatsAppProps {
  orderDetails: OrderDetails;
}

const SendOrderWhatsApp: React.FC<SendOrderWhatsAppProps> = ({ orderDetails }) => {
  const { customerName, orderDescription, orderTotal } = orderDetails;

  // Mensaje predefinido para WhatsApp
  const message = `*Nuevo Pedido a Heladería Procópios*\n\nCliente: ${customerName}\nPedido: ${orderDescription}\nTotal: $${orderTotal}\n\nPor favor, confirme el pedido.`;

  // Enlace de WhatsApp con el mensaje
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

  return (
    <div>
      <div className='mb-1'>
        Paga con transferencia a: <span className=" text-blue-500 font-bold ">{storeConfig.store.mercadoPago.alias}</span>
      </div>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button
          className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600"
        >
          <h2>Enviar Pedido</h2>
        </button>
      </a>
      
    </div>
  );
};

export default SendOrderWhatsApp;
