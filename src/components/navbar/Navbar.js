import React from 'react';
import './navbar.css';
import * as Ai from 'react-icons/ai';
import * as Hi from 'react-icons/hi';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../context/CartProvider';
import { Dropdown } from 'react-bootstrap';
import { auth } from '../../firebase';

export default function Navbar() {
    const [{ cart, user }, dispatch] = useStateValue()
    const history = useHistory();

    const orderHistory = () => {
        history.push('/orders')
    }
    
    const logout = () => {
        auth.signOut();
        history.push('/')
    }  

    return (
        <div id="navbar-container" className="border-bottom row">
            <div className="d-flex col-2">
                <Link to='/'>
                    <h2>Ecommerce</h2>
                </Link>
            </div>
            <div className="navbar-nav-options d-flex col-9 justify-content-end pr-0">
                {user ?
                    <Dropdown>
                        <Dropdown.Toggle className="pr-0">
                            <div className="navbar-user-container pr-0">
                                <div className="navbar-user-icon">
                                    <Hi.HiUserCircle />
                                    <h3>{user.displayName && user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}</h3>
                                </div>
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={orderHistory}>Order history</Dropdown.Item>
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>


                    :
                    <div className="navbar-login-register-container d-flex align-items-center">
                        <div className="navbar-login-container d-none d-sm-inline">
                            <Link to="/register">
                                <h3 className='m-0'>Sign up</h3>
                            </Link>
                        </div>
                        <div className="navbar-register-container pl-5 pr-3">
                            <Link to="/login">
                                <h3 className='m-0'>Sign in</h3>
                            </Link>
                        </div>
                    </div>
                }
                <div className="navbar-cart-container animate__animated" id="navbar-cart">
                    <Link to="/cart">
                        <div className="navbar-cart-icon"><Ai.AiOutlineShoppingCart /></div>
                        <h3>Cart ({cart && cart.length})</h3>
                    </Link>
                </div>
            </div>
        </div >
    )
}
