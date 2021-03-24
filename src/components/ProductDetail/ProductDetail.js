import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../product/product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    document.title = 'product detail';
    return (
        <div>
            <h3> {productKey} details coming soon</h3>
            <Product showAddToCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;