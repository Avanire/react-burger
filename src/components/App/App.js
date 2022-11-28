import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";

const App = () => {
    const api = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = React.useState({
        isLoading: false,
        ingredients: [],
        cart: [],
        lock: false
    });

    React.useEffect(() => {
        const getData = async () => {
            setState({...state, isLoading: true});

            const response = await fetch(api);
            const data = await response.json();

            setState({...state, isLoading: false, ingredients: data.data});
        }

        getData().catch(e => {
            //TODO сделать вывод ошибок
            console.log(e.message);
        });
        // eslint-disable-next-line
    }, []);


    const ingredientsCounter = (id, increment, quantity = 1) => {
        const ingredient = state.ingredients.find(i => i._id === id);

        if (ingredient.count) {
            ingredient.count = increment ? ingredient.count + quantity : ingredient.count - quantity;
        } else {
            ingredient.count = increment ? quantity : 0;
        }
    }

    const handleAddToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            if (!state.lock) {
                ingredientsCounter(ingredient._id, true, 2);
                const newCart = [...state.cart];
                newCart.push(ingredient);

                setState({...state, cart: newCart, lock: true});
            }
        } else {
            ingredientsCounter(ingredient._id, true);
            const newCart = [...state.cart];
            newCart.push(ingredient);

            setState({...state, cart: newCart});
        }

    }

    const handleClearCart = (ingredient) => {
        ingredientsCounter(ingredient._id, false);

        const currentIngr = state.cart.findIndex(
            (i) => i._id === ingredient._id
        );

        const newCart = [...state.cart];
        newCart.splice(currentIngr, 1);

        setState({...state, cart: newCart});

    }

    const handleCheckout = () => {

    }

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                <BurgerIngredients data={state.ingredients} addToCart={handleAddToCart}/>
                <BurgerConstructor
                    cart={state.cart}
                    clearCart={handleClearCart}
                    checkout={handleCheckout}
                />
            </main>
        </>
    );

}

export default App;
