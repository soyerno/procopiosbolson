import React from 'react';

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
      <h2>Enviar Pedido por WhatsApp</h2>
      <p>
        Haz clic en el botón para enviar los detalles del pedido a través de WhatsApp.
      </p>
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <button>Enviar Pedido</button>
      </a>
    </div>
  );
};

export default SendOrderWhatsApp;
