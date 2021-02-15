import React from 'react';
import accessoriesProducts from '../productsCollection/AccessoriesProducts'
import ProductComponent from './ProductComponent';

export default function AccessoriesNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={accessoriesProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
