import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import data from './utils/data.json';

class App extends React.Component {

    state = {
        data: [],
        cart: []
    }

    componentDidMount() {
        this.setState({data: data})
    }

    handleAddToCart = (obj) => {
        this.setState(prevState => ({
            ...prevState,
            cart: [...obj]
        }))
    }

    render() {
        return (
            <>
                <AppHeader/>
                <main className={app.main}>
                    <BurgerIngredients data={this.state.data} addToCart={this.handleAddToCart} />
                    <BurgerConstructor />
                </main>
            </>
        );
    }
}

export default App;
