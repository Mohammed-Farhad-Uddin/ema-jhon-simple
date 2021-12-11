import React from 'react';
import fakeData from '../../fakeData';


const Inventory = () => {

    const handleAddProduct=()=>{
        fetch('http://localhost:5000/addProduct',{
            method: 'POST',
            body: JSON.stringify(fakeData),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
        })

    }

    return (
        <div>
            <form action="">
                <p>
                    <span>Name: </span>
                    <input type="text"></input>
                </p>
                <p>
                    <span>Price: </span>
                    <input type="text"></input>
                </p>
                <p>
                    <span>Quantity: </span>
                    <input type="text"></input>
                </p>
                <p>
                    <span>Product Image: </span>
                    <input type="file"></input>
                </p>
                <button onClick={handleAddProduct}>addProduct</button>
            </form>
        </div>
    );
};

export default Inventory;