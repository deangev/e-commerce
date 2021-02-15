import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './register.css';
import Button from '@material-ui/core/Button';
import { auth, db } from '../../../../firebase';
import { useHistory } from 'react-router-dom';
import Navbar from '../../../navbar/Navbar';
// import { Button } from 'react-bootstrap';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const register = e => {
        const cart = {
            cart: []
        }
        const orders = {
            history: []
        }
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(async (auth) => {
                await auth.user.updateProfile({
                    displayName: name
                })
                history.push('/')
                db.collection('carts').doc(auth.user.uid).set(cart)
                db.collection('history').doc(auth.user.uid).set(orders)
            })
            .catch(error => alert(error.message))
    }

    return (
        <div>
            <Navbar />
            <div className="register-container col-12 col-md-6">
                <h1 className="border-bottom">Register</h1>
                <form>
                    <div className="d-flex flex-column">
                        <TextField required onChange={e => setName(e.target.value)} label="Your name" />
                        <TextField required onChange={e => setEmail(e.target.value)} label="Email" />
                        <TextField required type="password" onChange={e => setPassword(e.target.value)} label="Password" />
                        <Button variant="outlined" type="submit" onClick={register} id="register-button">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
