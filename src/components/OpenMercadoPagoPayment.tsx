import React from 'react';

// Definimos los tipos de las props
interface PaymentDetails {
  accountId: string;
  paymentAmount: number;
  paymentReference: string;
}

interface OpenMercadoPagoPaymentProps {
  paymentDetails: PaymentDetails;
}

const OpenMercadoPagoPayment: React.FC<OpenMercadoPagoPaymentProps> = ({ paymentDetails }) => {
  const { accountId, paymentAmount, paymentReference } = paymentDetails;

  // Enlace de MercadoPago (reemplaza con el ID real de la preferencia de pago)
  const mercadoPagoLink = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${paymentReference}`;

  return (
    <div>
      <h2>Transferir Pago a MercadoPago</h2>
      <p>
        Haz clic en el botón para transferir ${paymentAmount} a la cuenta {accountId}.
      </p>
      <a href={mercadoPagoLink} target="_blank" rel="noopener noreferrer">
        <button>Realizar Pago con MercadoPago</button>
      </a>
    </div>
  );
};

export default OpenMercadoPagoPayment;
