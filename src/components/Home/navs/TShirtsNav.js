import React from 'react';
import TShirtsProducts from '../productsCollection/TShirtsProducts';
import ProductComponent from './ProductComponent';

export default function TShirtsNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={TShirtsProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
