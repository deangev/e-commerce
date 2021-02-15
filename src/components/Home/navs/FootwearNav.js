import React from 'react'
import footwearProducts from '../productsCollection/FootwearProducts'
import ProductComponent from './ProductComponent'

export default function FootwearNav({setActiveKey}) {
    return (
        <div className="products-container d-flex">
            <ProductComponent collection={footwearProducts} setActiveKey={setActiveKey}/>
        </div>
    )
}
