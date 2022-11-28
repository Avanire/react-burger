import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./BurgerConstructor/BurgerConstructor";

const App = () => {
    const api = 'https://norma.nomoreparties.space/api/ingredients';

    const [state, setState] = React.useState({
        isLoading: false,
        data: [],
        bun: null,
        ingredients: []
    });

    React.useEffect(() => {
        const getData = async () => {
            setState({...state, isLoading: true});

            const response = await fetch(api);
            const data = await response.json();

            setState({...state, isLoading: false, data: data.data});
        }

        getData().catch(e => {
            //TODO сделать вывод ошибок
            console.log(e.message());
        });
    }, []);

    const ingredientsCounter = (id, increment) => {
        const ingredient = state.data.find(i => i._id === id);

        ingredient.count = increment ? ingredient.count + 1 : ingredient.count - 1;
    }

    const handleAddToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            this.setState({...state, bun: ingredient});
        } else {
            const newIngredientsArr = [...this.state.ingredients];
            newIngredientsArr.push(ingredient);

            this.setState({
                ...state,
                ingredients: newIngredientsArr
            });
        }

        ingredientsCounter(ingredient.id, true);
    }

    const handleClearCart = (ingredient) => {
/*        const currentIngr = this.state.ingredients.findIndex(
            (i) => i._id === ingredient._id
        );

        const newIngredients = [...this.state.ingredients];
        ingredient.count = ingredient.count - 1;

        newIngredients.splice(currentIngr, 1);

        this.setState(prevState => ({
            ...prevState,
            ingredients: newIngredients
        }))*/

    }

    const handleCheckout = () => {

    }

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                <BurgerIngredients data={state.data} addToCart={handleAddToCart}/>
                <BurgerConstructor
                    bun={state.bun}
                    ingredients={state.ingredients}
                    clearCart={handleClearCart}
                    checkout={handleCheckout}
                />
            </main>
        </>
    );

}

export default App;
