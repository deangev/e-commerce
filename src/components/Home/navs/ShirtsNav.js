import React from 'react';
import shirtsProducts from '../productsCollection/ShirtsProducts'
import ProductComponent from './ProductComponent';

export default function ShirtsNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={shirtsProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
