import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import app from './App.module.css';
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import data from './utils/data.json';

class App extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.setState({data: data})
    }

    render() {
        return (
            <>
                <AppHeader/>
                <main className={app.main}>
                    <BurgerIngredients data={this.state.data}/>
                </main>
            </>
        );
    }
}

export default App;
