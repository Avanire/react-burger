import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {getIngredients} from "../../utils/burger-api";

const App = () => {
    const [stateApi, setStateApi] = React.useState({
        isLoading: false,
        ingredients: [],
        hasError: false
    });

    React.useEffect(() => {
        setStateApi(prevState => ({
            ...prevState,
            isLoading: true
        }));

        getIngredients()
            .then(data => {
                setStateApi(prevState => ({
                    ...prevState,
                    isLoading: false,
                    ingredients: data.data
                }));
            })
            .catch(e => {
                setStateApi(prevState => ({
                    ...prevState,
                    isLoading: false,
                    hasError: true
                }));

                console.log(e.message);
            });
    }, []);

    return (
        <>
            <AppHeader/>
            {stateApi.hasError ? (
                <section>
                    <h1>Что-то пошло не так :(</h1>
                    <p>
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            ) : (<main className={app.main}>
                <BurgerIngredients data={stateApi.ingredients}/>
                <BurgerConstructor cart={stateApi.ingredients}/>
            </main>)
            }
        </>
    );

}

export default App;
