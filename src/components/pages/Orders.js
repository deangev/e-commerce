import React from 'react';
import { useStateValue } from '../../context/CartProvider';
import Navbar from '../navbar/Navbar';
import './orders.css';

export default function Orders() {
    const [{ history }, dispatch] = useStateValue()
    console.log(history);
    return (
        <div>
            <Navbar />
            <div className="order-history-container">
                <h1>Order history</h1>
                <div className="row">
                    <div className="col-lg-12 mx-auto">
                        {history.length > 0 ?
                            <div id="accordionExample" className="accordion shadow mb-5">
                                {history.map((order, index) => {
                                    return (
                                        <div className="card" key={index}>
                                            <div className="card-header bg-white shadow-sm border-0">
                                                <h3 className="mb-0 font-weight-bold">
                                                    <a href="#" data-toggle="collapse" collapsed="true"
                                                        data-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseOne"
                                                        className="d-block position-relative text-dark collapsible-link py-2">
                                                        {order[1]} | {order.length - 1} items | {order[0]}
                                                    </a>
                                                </h3>
                                            </div>
                                            <div id={`collapse${index}`} aria-labelledby={`heading${index}`} data-parent="#accordionExample" className="collapse">
                                                <div className="card-body p-5">
                                                    {order.map((item, index2) => {
                                                        return index2 > 1 &&
                                                            <div className="d-flex order-item mt-5 pb-5 border-bottom" key={index2}>
                                                                <img className="col-2" src={item.image} alt="" />
                                                                <div>
                                                                    <h3>Name: {item.title}</h3>
                                                                    <h3>Color: {item.color}</h3>
                                                                    <h3>Quantity: {item.quantity}</h3>
                                                                    <h3>Size: {item.size}</h3>
                                                                    <h3>Total price: {item.totalPrice}</h3>
                                                                </div>
                                                            </div>
                                                    })}
                                                </div>
                                                <div>
                                                    <h2 className="pl-5 pb-3">Total price: {order[1]}</h2>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> :
                            <div style={{ textAlign: 'center' }} className="text-muted"><h2>No orders</h2></div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}