import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product;


    return (
        <div>
            <h4>{name}</h4>
            <p>Quanity: {quantity}</p>
            <p>${price}</p>
            <br/>
            <button className="cart-btn" onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;