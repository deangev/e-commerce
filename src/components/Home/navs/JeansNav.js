import React from 'react';
import jeansProducts from '../productsCollection/JeansProducts';
import ProductComponent from './ProductComponent';

export default function JeansNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={jeansProducts} setActiveKey={setActiveKey}/>
        </div>
    )
}
