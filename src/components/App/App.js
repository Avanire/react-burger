import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import '../../models/init';

const App = () => {

    return (
        <>
            <AppHeader/>
            <main className={app.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>
    );

}

export default App;
