import React from 'react';
import homeProducts from '../productsCollection/HomeProducts';
import ProductComponent from './ProductComponent';

export default function HomeNav({ setActiveKey }) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={homeProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
