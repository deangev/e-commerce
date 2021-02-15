import React from 'react'
import pantsProducts from '../productsCollection/PantsProducts'
import ProductComponent from './ProductComponent'

export default function PantsNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={pantsProducts} setActiveKey={setActiveKey} />
        </div>
    )
}
