import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

const App = () => {

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </main>
        </>
    );

}

export default App;
