import React, { useContext, useState } from 'react'
import { useStateValue } from '../../../context/CartProvider';
import ProductContext from '../../../context/ProductContext';
import './product.css';

export default function Product() {
    const [{ cart }, dispatch] = useStateValue();
    const { currentProduct } = useContext(ProductContext);
    const [currentSize, setCurrentSize] = useState('');


    const addToCart = (e) => {
        e.preventDefault()
        dispatch({
            type: 'ADD_TO_CART',
            item: {
                id: currentProduct.id,
                image: currentProduct.image,
                title: currentProduct.title,
                price: currentProduct.price,
                color: e.target[0].value,
                size: e.target[1].value,
                quantity: 1,
                totalPrice: currentProduct.price.replace(',', '')
            }
        })
        document.getElementById('navbar-cart').classList.add('animate__heartBeat')
        setTimeout(() => {
            document.getElementById('navbar-cart').classList.remove('animate__heartBeat')
        }, 850);
    }

    const getColor = () => {
        let color = currentProduct && currentProduct.title.split('- ')[1]
        return color
    }

    return (
        currentProduct && <div className="single-product-container d-flex animate__animated animate__zoomIn">
            <div className="single-product-image-container col-6">
                <img src={currentProduct.image} alt="" />
            </div>
            <div className="single-product-right-container col-6">
                <h1>{currentProduct.title}</h1>
                <h2 className="mb-5 mt-4">{currentProduct.price}</h2>
                <div className="single-product-select-container d-flex">
                    <form onSubmit={e => addToCart(e)} id="product-form-container" className="col-12 p-0">
                        <div className="col-5 select-color-container d-flex flex-column">
                            <label htmlFor="select-color-options">Color</label>
                            <select id="select-color-options">
                                <option value={getColor()}>{getColor()}</option>
                            </select>
                        </div>
                        <div className="col-5 select-size-container d-flex flex-column">
                            <label htmlFor="select-size-options">Size</label>
                            {(!currentProduct.title.includes('Pants') && !currentProduct.title.includes('Jeans') && !currentProduct.title.includes('Shorts')
                                && !currentProduct.title.includes('Cap') && !currentProduct.title.includes('Sneaker') && !currentProduct.title.includes('Boots')
                            ) &&
                                <select required onChange={e => setCurrentSize(e.target.value)} id="select-size-options">
                                    <option></option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select>
                            }
                            {(currentProduct.title.includes('Pants') || currentProduct.title.includes('Jeans') || currentProduct.title.includes('Shorts')) &&
                                <select required onChange={e => setCurrentSize(e.target.value)} id="select-size-options">
                                    <option></option>
                                    <option value="28">28</option>
                                    <option value="30">30</option>
                                    <option value="32">32</option>
                                    <option value="34">34</option>
                                    <option value="36">36</option>
                                    <option value="38">38</option>
                                </select>
                            }
                            {currentProduct.title.includes('Cap') &&
                                <select onChange={e => setCurrentSize(e.target.value)} id="select-size-options">
                                    <option value="OSFA">OSFA</option>
                                </select>
                            }
                            {(currentProduct.title.includes('Sneaker') || currentProduct.title.includes('Boots')) &&
                                <select required onChange={e => setCurrentSize(e.target.value)} id="select-size-options">
                                    <option></option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                </select>
                            }
                        </div>
                        <button type="submit" className="col-8 hbtn hb-fill-middle2-bg">ADD TO CART
                            {cart.map(item => {
                            return (
                                (item.id === currentProduct.id && item.size === currentSize) && `(${item.quantity})`
                            )
                        })}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}

