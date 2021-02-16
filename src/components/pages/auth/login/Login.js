import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import './login.css';
import Button from '@material-ui/core/Button';
import { auth } from '../../../../firebase';
import { Link, useHistory } from 'react-router-dom';
import Navbar from '../../../navbar/Navbar';
// import { Button } from 'react-bootstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const signIn = e => {
        e.preventDefault()
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }

    return (
        <div>
            <Navbar />
            <div className="login-container col-12 col-md-6">
                <h1 className="border-bottom">Sign in</h1>
                <form>
                    <div className="d-flex flex-column">
                        <TextField required onChange={e => setEmail(e.target.value)} label="Email" />
                        <TextField required type="password" onChange={e => setPassword(e.target.value)} label="Password" />
                        <Button variant="outlined" type="submit" onClick={signIn} id="login-button">Sign in</Button>
                    </div>
                </form>
                <h3 style={{textAlign: 'center', marginTop: '2rem'}}>Don't have an account? <Link to="/register">sign up!</Link></h3>
            </div>
        </div>
    )
}
