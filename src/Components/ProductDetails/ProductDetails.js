import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react/cjs/react.development';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey}=useParams()
    const[product,setProduct]=useState({})
    useEffect(()=>{
        fetch('http://localhost:5000/product/'+productKey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
       
    },[productKey])

    // {nicher fakeData baad diye upore database tekhe data new hocce
    // const product=fakeData.find((item)=> {
    //     // console.log(item)
    //    return item.key===productKey
    // })
    // console.log(product);}
    return (
        <div>
            <h1>{productKey} details comming soon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;