import React from 'react'
import { useStateValue } from '../../context/CartProvider'
import SideNavbar from '../Home/sideNavbar/SideNavbar'
import Navbar from '../navbar/Navbar'
import './home.css'

export default function Home() {
    const [{ user }] = useStateValue();
    return (
        <div>
            <Navbar />
            <div className="mt-5 home-header pr-4 pl-4">
                {user ?
                    <div>
                        <h1>Hello {user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)}, </h1>
                        <h1>this is e-commerce demo</h1>
                    </div>
                    :
                    <div>
                        <h1>Hello this is e-commerce demo,</h1>
                        <h1>login for more functionality and to save your cart!</h1>
                    </div>
                }
            </div>
            <SideNavbar />
        </div>
    )
}
