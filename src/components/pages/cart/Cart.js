import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../../context/CartProvider'
import Navbar from '../../navbar/Navbar';
import './cart.css'
import { Link, useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

toast.configure()

export default function Cart() {
    const [{ cart }, dispatch] = useStateValue();
    const [subtotal, setSubtotal] = useState();
    const [num, setNum] = useState();
    const history = useHistory();
    let afterDot = 0;
    let beforeDot = 0;

    const changeQuantity = (value, index) => {
        dispatch({
            type: 'CHANGE_QUANTITY',
            item: {
                value,
                index
            }
        })
    }

    const removeItem = (index) => {
        let element = document.getElementById(`cart-item-${index}`)
        element.classList.add('animate__zoomOut')
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_FROM_CART',
                item: {
                    index
                }
            })
            element && element.classList.remove('animate__zoomOut')
            element && element.classList.remove('animate__zoomIn')
        }, 300);
    }

    useEffect(() => {
        cart.map(item => {
            afterDot += parseInt(item.totalPrice.split('.')[1].substring(0, 1))
            beforeDot += parseInt(item.totalPrice.slice(1))
        })
        setNum(Math.floor(Number(beforeDot + '.' + afterDot)))
        setSubtotal(`$${beforeDot}.${afterDot}`)
    }, [cart.length, cart, subtotal, setSubtotal])

    async function handleToken(token, addresses) {
        try {
            const response = await axios.post('https://e-commerce-app-de.herokuapp.com/checkout', {
                price: num,
                token
            })
            const { status } = response.data;
            
            if (status === 'success') {
                history.push('/orders')
                let newCart = cart
                newCart = [new Date().toLocaleDateString()].concat([subtotal]).concat(cart)
                dispatch({
                    type: 'SUBMIT_ORDER',
                    item: newCart
                })
                dispatch({
                    type: 'EMPTY_CART'
                })
                toast("Success! The payment transfered successfully", { type: "success" });
            } else {
                toast("Something went wrong", { type: "error" });
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <Navbar />
            <div className="cart-container p-4 pr-5 pr-sm-0">
                <table>
                    <thead>
                        <tr className="row mb-5">
                            <th className="col-2">Product</th>
                            <th className="col-sm-4 col-3"></th>
                            <th className="col-2 pqt">Price</th>
                            <th className="col-sm-2 col-3 pqt">Quantity</th>
                            <th className="col-2 pqt">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.length === 0 ?
                            <tr>
                                <td>
                                    <h2 style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '2rem' }} className="text-muted">Cart is empty</h2>
                                </td>
                            </tr> :
                            cart.map((item, index) => {
                                return (
                                    <tr key={index} id={`cart-item-${index}`} className={`row cart-item-container border-bottom animate__animated animate__zoomIn animate__faster`}>
                                        <td className="col-2 cart-item-img-container"><img src={item.image} alt="" /></td>
                                        <td className="col-sm-4 col-3 d-flex align-items-center">
                                            <div className="cart-item-product-details">
                                                <h2>{item.title}</h2>
                                                <h4 className="mb-5"><span className="mr-2">{item.color}</span>/<span className="ml-2">{item.size}</span></h4>
                                                <h4 className="cart-item-remove" onClick={() => removeItem(index)}>Remove</h4>
                                            </div>
                                        </td>
                                        <td className="col-2 pqt">{item.price}</td>
                                        <td className="col-2 pqt"><input type="number" min="1" max="999" defaultValue={item.quantity} onChange={e => changeQuantity(e.target.value, index)} name="" id="" /></td>
                                        <td className="col-2 pqt">{item.totalPrice}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
                <div className="cart-checkout-container pt-1">
                    <h2 className={cart && cart.length === 0 ? 'border-top' : undefined}>Subtotal: {subtotal}</h2>
                    <div className="col-12 col-md-5 cart-checkout-buttons d-flex flex-column">
                        <button href="#" className="cart-continue-button hbtn hb-fill-middle2-bg"><Link to="/">Continue shopping</Link></button>
                        <p className="animate__animated animate__pulse animate__infinite" style={{ textAlign: 'center', color: 'red' }}>Demo Card Number: 4242 4242 4242 4242</p>
                        <div className="col-12" style={{margin: '0 auto'}}>
                            <StripeCheckout
                                stripeKey='pk_test_51IJe3LADckYf3b9L2WYGNm8n5yXAhJEeCrgcU0hCV3GpH3eimXa61T1d3NCLyD2VAhe6l5OWTBAOt22m4kdg0VNL00l4mpB5OT'
                                token={handleToken}
                                billingAddress
                                shippingAddress
                                amount={num * 100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
