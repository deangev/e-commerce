import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/pages/auth/login/Login';
import Register from './components/pages/auth/register/Register';
import Cart from './components/pages/cart/Cart';
import Home from './components/pages/Home';
import Orders from './components/pages/Orders';
import { useStateValue } from './context/CartProvider';
import ProductContext from './context/ProductContext';
import { auth, db } from './firebase';

function App() {
  const [currentProduct, setCurrentProduct] = useState('');
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
        const user = db.collection('carts').doc(auth.currentUser.uid);
        const doc = await user.get();
        const docData = doc.data();
        if (docData) {
          const cartItems = docData && docData.cart;
          dispatch({
            type: 'LOAD_CART',
            items: cartItems
          });
        }
        const userHistory = db.collection('history').doc(auth.currentUser.uid);
        const docHistory = await userHistory.get();
        const docDataHistory = docHistory.data()
        if (docDataHistory) {
          const orderHistory = docDataHistory && docDataHistory.history;
          dispatch({
            type: 'LOAD_HISTORY',
            items: orderHistory
          });
        }
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [user])

  return (
    <div className="App">
      <Router>
        <Switch>
          <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/orders" component={Orders} />
          </ProductContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
