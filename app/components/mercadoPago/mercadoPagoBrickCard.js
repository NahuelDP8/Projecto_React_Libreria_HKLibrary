'use client';
import { useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import LibraryClientApi from '@/app/services/LibraryClientApi';
import { Modal } from 'react-bootstrap';
import LocalRepository from '@/app/services/LocalRepository';

initMercadoPago('TEST-3a2a4180-ed34-4c24-bce6-65c02cacbc2d');

export function PaymentForm ({ 
  totalPrice,
  show,
  handleClose,
  librosCompra,
  deleteCart,
  handleUnproccessableError,
  handleAuthenticationError,
  handleGeneralErrors
}){
  const initialization = {
    amount: totalPrice,
  };


  useEffect(() => {
    initMercadoPago('TEST-3a2a4180-ed34-4c24-bce6-65c02cacbc2d');
  }, []);

  const onSubmit = async (formData) => {
    const formattedCart = librosCompra.map( product => {
        return {
            id:product.id,
            cantidad:product.cantidad
        }
    });

    const purchaseData = {
        libros:formattedCart,
        formData:formData
    }
    
    console.log(purchaseData);
      const clientApi = new LibraryClientApi();
      clientApi.buyOrder(purchaseData).then( response => {
        console.log("response");
        deleteCart();
        handleClose();
    }).catch( error => {
        if(error.response.status === 422){
            console.log("422");
            console.log(error);
            console.log(error.response.data.message);
            handleUnproccessableError(error.response.data.message);
        }else if(error.response.status === 419 || error.response.status === 401){
            console.log("Err auth");
            handleAuthenticationError();
        }else{
            console.log("otro err");
            handleGeneralErrors(error.response.message);
        }
    });
  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log("errorBrick: ");
    console.log(error);
  };

  const onReady = async () => {
    console.log("brick listo");
    /*
      Callback llamado cuando Brick está listo.
      Aquí puedes ocultar cargamentos de su sitio, por ejemplo.
    */
  };

  return (
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Mercado Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CardPayment
                initialization={initialization}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
      </Modal.Body>
      
    </Modal>
  );
};