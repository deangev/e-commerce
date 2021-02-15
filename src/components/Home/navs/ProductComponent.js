import React, { useContext } from 'react';
import ProductContext from '../../../context/ProductContext';
import './productComponent.css';

export default function ProductComponent({ collection, setActiveKey }) {
    const { setCurrentProduct } = useContext(ProductContext);
    return (
        <>
            {collection.map((product, index) => {
                return (
                    <div className="product-wrapper col-4 animate__animated animate__zoomIn" id={product.id} key={index}>
                        <div className="">
                            <div className="product-container">
                                <img src={product.image} alt="" onClick={() => {
                                    setActiveKey(`${product.title}`)
                                    setCurrentProduct(product)
                                }} />
                                <h3 onClick={() => {
                                    setActiveKey(`${product.title}`)
                                    setCurrentProduct(product)
                                }}>{product.title}</h3>
                                <h3>{product.price}</h3>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
