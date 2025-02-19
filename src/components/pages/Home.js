import React from 'react'
import { useStateValue } from '../../context/CartProvider'
import MobileNavbar from '../Home/sideNavbar/MobileNavbar'
import SideNavbar from '../Home/sideNavbar/SideNavbar'
import Navbar from '../navbar/Navbar'
import './home.css'

export default function Home() {
    const [{ user }] = useStateValue();
    return (
        <div className="home-container">
            <Navbar />
            <div className="home-header mb-5">
                {user ?
                    <div>
                        <h1>Hello {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}, this is an e-commerce demo</h1>
                    </div>
                    :
                    <div>
                        <h1>Hello this is an e-commerce demo, login for more functionality and to save your cart!</h1>
                    </div>
                }
            </div>
            <div className="d-block d-sm-none">
                <MobileNavbar />
            </div>
            <div className="d-none d-sm-block">
                <SideNavbar />
            </div>
        </div>
    )
}
