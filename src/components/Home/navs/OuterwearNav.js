import React from 'react'
import outerwearProducts from '../productsCollection/Outerwear'
import ProductComponent from './ProductComponent'

export default function OuterwearNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={outerwearProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
