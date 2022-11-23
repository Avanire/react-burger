import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import data from './utils/data.json';

class App extends React.Component {

    state = {
        data: [],
        bun: null,
        ingredients: []
    }

    componentDidMount() {
        this.setState({data: data})
    }

    handleAddToCart = (ingredient) => {
        if (ingredient.type === 'bun') {
            this.setState(prevState => ({
                ...prevState,
                bun: ingredient
            }));
        } else {
            const newIngredientsArr = [...this.state.ingredients];
            newIngredientsArr.push(ingredient);

            this.setState(prevState => ({
                ...prevState,
                ingredients: newIngredientsArr
            }));
        }
    }

    handleClearCart = (ingredient) => {
        const currentIngr = this.state.ingredients.findIndex(
            (i) => i._id === ingredient._id
        );

        const newIngredients = [...this.state.ingredients];
        ingredient.count = ingredient.count - 1;

        newIngredients.splice(currentIngr, 1);

        this.setState(prevState => ({
            ...prevState,
            ingredients: newIngredients
        }))

    }

    handleCheckout = () => {

    }

    render() {
        return (
            <>
                <AppHeader/>
                <main className={app.main}>
                    <BurgerIngredients data={this.state.data} addToCart={this.handleAddToCart}/>
                    <BurgerConstructor
                        bun={this.state.bun}
                        ingredients={this.state.ingredients}
                        clearCart={this.handleClearCart}
                        checkout={this.handleCheckout}
                    />
                </main>
            </>
        );
    }
}

export default App;
