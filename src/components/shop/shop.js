import './shop.css';
import React, { useState } from 'react';
import fakeData  from "../../fakeData";
import Product from '../product/product';
import Cart from '../cart/cart';


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleCardBtn = (product) => {
        const newCount = [...cart, product];
        setCart(newCount);
    }


    return (
        <div className='shop-container'>
            <div className="product-container"> 
                {
                    products.map(pd => <Product 
                        product={pd}
                        handleCardBtn = {handleCardBtn}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} ></Cart>
            </div>

        </div>
    );
};

export default Shop;