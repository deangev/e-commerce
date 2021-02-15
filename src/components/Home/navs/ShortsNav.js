import React from 'react'
import shortsProducts from '../productsCollection/ShortsProducts'
import ProductComponent from './ProductComponent'

export default function ShortsNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={shortsProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
