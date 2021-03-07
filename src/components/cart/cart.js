import React from 'react';


const Cart = (props) => {
    const cart = props.cart;

    const total = cart.reduce( (total, product) => total + product.price * product.quantity, 0);


    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const  tax = (total / 10).toFixed(2);
    const grandtotal = (total + shipping + Number(tax)).toFixed(2);

    const formateNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p>Items order: {cart.length}</p>
            <p>Product price: {formateNumber(total)}</p>
            <p>Shipping cost: {shipping}</p>
            <p>Tax + Vat: {tax}</p>
            <p>Total price: {grandtotal}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;