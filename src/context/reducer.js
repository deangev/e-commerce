import { auth, db } from '../firebase';

export const initialState = {
    cart: [],
    history: [],
    user: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return {
                ...state,
                cart: action.items
            }

        case 'LOAD_HISTORY':
            let history = []
            for (let value in action.items) {
                history.push(action.items[value]);
            }
            return {
                ...state,
                history: history
            }

        case 'SUBMIT_ORDER':
            if (state.user) {
                var userUID = auth.currentUser && auth.currentUser.uid;
                let history = [...state.history, action.item]
                db.collection('history').doc(userUID).set({ history: Object.assign({}, history) })
                return {
                    ...state,
                    history: [...state.history, action.item]
                }
            }

        case 'EMPTY_CART':
            if (state.user) {
                var userUID = auth.currentUser.uid
                let cartObject = { cart: [] }
                db.collection('carts').doc(userUID).set(cartObject)
            }
            return {
                ...state,
                cart: []
            }

        case 'ADD_TO_CART':
            const inCart = state.cart.some(el => el.title === action.item.title);
            if (inCart) {
                const addIndex = state.cart.findIndex(
                    cartItem => (cartItem.id === action.item.id) && (cartItem.size === action.item.size)
                )

                if (addIndex === -1) {
                    if (state.user) {
                        var userUID = auth.currentUser.uid
                        let cartObject = { cart: [...state.cart] }
                        db.collection('carts').doc(userUID).set(cartObject)
                    }
                    return {
                        ...state,
                        cart: [...state.cart, action.item]
                    };
                } else {
                    state.cart[addIndex].quantity += 1
                    let left = (state.cart[addIndex].price.slice(1));
                    let right = parseInt(left.split('.')[1]) * state.cart[addIndex].quantity;
                    left = parseInt(left.replace(',', '')) * state.cart[addIndex].quantity;

                    let total = '$' + left + '.' + right;
                    state.cart[addIndex].totalPrice = total
                    if (state.user) {
                        var userUID = auth.currentUser.uid
                        let cartObject = { cart: [...state.cart] }
                        db.collection('carts').doc(userUID).set(cartObject)
                    }

                    return {
                        ...state,
                        cart: [...state.cart]
                    }
                }

            } else {
                if (state.user) {
                    var userUID = auth.currentUser.uid
                    let cartObject = { cart: [...state.cart, action.item] }
                    db.collection('carts').doc(userUID).set(cartObject)
                }
                return {
                    ...state,
                    cart: [...state.cart, action.item]
                };
            }

        case 'REMOVE_FROM_CART':
            const removeIndex = action.item.index;
            let newCart = [...state.cart];
            newCart.splice(removeIndex, 1);
            if (state.user) {
                var userUID = auth.currentUser.uid
                let cartObject = { cart: newCart }
                db.collection('carts').doc(userUID).set(cartObject)
            }
            return {
                ...state,
                cart: newCart
            };

        case 'CHANGE_QUANTITY':
            const changeIndex = action.item.index;
            state.cart[changeIndex].quantity = parseInt(action.item.value);

            let left = (state.cart[changeIndex].price.slice(1));
            let right = parseInt(left.split('.')[1]) * state.cart[changeIndex].quantity;
            left = parseInt(left.replace(',', '')) * state.cart[changeIndex].quantity;
            right = parseInt(String(right).substring(0, 2))
            let total = '$' + left + '.' + right;
            state.cart[changeIndex].totalPrice = total

            if (state.user) {
                var userUID = auth.currentUser.uid
                let changeObject = { cart: [...state.cart] }
                db.collection('carts').doc(userUID).set(changeObject)
            }

            return {
                ...state,
                cart: [...state.cart]
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
}

export default reducer;