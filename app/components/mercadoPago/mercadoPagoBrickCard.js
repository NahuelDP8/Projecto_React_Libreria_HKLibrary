'use client';
import { useEffect } from 'react';
import { initMercadoPago, CardPayment } from '@mercadopago/sdk-react';
import axios from 'axios';
import LibraryClientApi from '@/app/services/LibraryClientApi';
import { Modal } from 'react-bootstrap';
initMercadoPago('TEST-3a2a4180-ed34-4c24-bce6-65c02cacbc2d');

export function PaymentForm ({ totalPrice, realizarCompra,show,handleClose,librosCompra }){
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
         const clientApi = new LibraryClientApi();
         clientApi.buyOrder(purchaseData).then( response => {
             const storage = new LocalRepository();
             storage.clearCart();

        }).catch( error => {
            console.log(error);
            if(error.response.status === 422){
                // setErrorMessage(error.response.data.message);
                // setDisableBuyButton(false);
            }else if(error.response.status === 419 || error.response.status === 401){
                // const cookieManager = new AuthCookieManager();
                // cookieManager.deleteAuthCookie();

                // router.push('/login');
            }else{
                // setErrorMessage(error.response.data.message);
                // setDisableBuyButton(false);
            }
        });
    

  };

  const onError = async (error) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };

  const onReady = async () => {
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