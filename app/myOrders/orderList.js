'use client';

import Order from "./orderRow";

export default function OrdersList({clientOrders, showOrderPopup}){
    return(
        <div className="orderList m-auto p-2">
            {clientOrders.map( order => 
                <Order orderData={order} key={order.id} showOrderPopup={showOrderPopup}></Order>
            )}
        </div>
    );
}