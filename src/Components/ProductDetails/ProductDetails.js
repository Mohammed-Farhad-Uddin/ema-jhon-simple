import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey}=useParams()
    const product=fakeData.find((item)=> {
        // console.log(item)
       return item.key===productKey
    })
    // console.log(product);
    return (
        <div>
            <h1>{productKey} details comming soon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;