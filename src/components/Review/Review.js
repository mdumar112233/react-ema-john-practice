import React, { useEffect, useState} from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../cart/cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    useEffect(() => {
        // cart
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProduct = productKey.map(key => {
            const product = fakeData.find(pd =>  pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct);
    })

    const history = useHistory();
    const handleProceedCheckout = () => {
        history.push('./shipment');
    }

    const removeProduct = (productKey)=> {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>;
    }
    return (
        <div className='twin-container'>
            <div className='add-item'>
                {
                    cart.map(pd => <ReviewItem product={pd} removeProduct={removeProduct}></ReviewItem>)
                }
                {/* after orderplace */}
                {
                    thankYou
                }
            </div>
            <div className="cart-item">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>

        </div>
    );
};

export default Review;