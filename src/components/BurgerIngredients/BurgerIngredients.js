import React from "react";
import burgerIngredients from './BurgerIngredients.module.css';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
});

const Card = ({ingredient, addToCart, lockBun, setLockBun}) => {

    const increment = () => {
        if (ingredient.type === 'bun' && !lockBun) {
            addToCart(ingredient);
            setLockBun(true);
        } else if (ingredient.type !== 'bun') {
            ingredient.count = ingredient.count ? ingredient.count + 1 : 1;
            addToCart(ingredient);
        }
    }

    return (
        <section
            className={`${burgerIngredients.product} mb-8`}
            onClick={increment}
        >
            <span className="counter">{ingredient.count > 0 &&
                <Counter count={ingredient.count} size="default" extraClass="m-1"/>}</span>
            <div className={burgerIngredients.image}>
                <picture>
                    <source srcSet={ingredient.imageMobile} media="(max-width: 375px)"/>
                    <source srcSet={ingredient.imageLarge} media="(max-width: 1920px)"/>
                    <img src={ingredient.image} alt={ingredient.name} style={{width: '100%'}}/>
                </picture>
            </div>
            <div className={burgerIngredients.price}><span
                className='text text_type_digits-default pr-2 mt-1 mb-1'>{ingredient.price}</span><CurrencyIcon
                type="primary"/></div>
            <div className={`text text_type_main-default ${burgerIngredients.name}`}>{ingredient.name}</div>
        </section>
    );
}

const Category = ({name, category, addToCart}) => {
    const [lockBun, setLockBun] = React.useState(false);

    return (
        <section>
            <h2 className='text text_type_main-medium mb-6'>{name}</h2>
            <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                {
                    category.map(item => <Card key={item._id} ingredient={item} addToCart={addToCart} lockBun={lockBun}
                                               setLockBun={setLockBun}/>)
                }
            </div>
        </section>
    );
}

Category.propTypes = {
    name: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(dataPropTypes).isRequired
}

class BurgerIngredients extends React.Component {
    state = {
        currentTab: 'rolls',
        lock: false
    }

    setCurrentTab = (value) => {
        this.setState({currentTab: value})
    }

    render() {
        return (
            <section className={`${burgerIngredients.ingredients} mr-10`}>
                <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
                <div style={{display: 'flex'}} className='mb-10'>
                    <Tab value="rolls" active={this.state.currentTab === 'rolls'} onClick={this.setCurrentTab}>
                        Булки
                    </Tab>
                    <Tab value="sauce" active={this.state.currentTab === 'sauce'} onClick={this.setCurrentTab}>
                        Соусы
                    </Tab>
                    <Tab value="fillings" active={this.state.currentTab === 'fillings'} onClick={this.setCurrentTab}>
                        Начинки
                    </Tab>
                </div>
                <div className={burgerIngredients.category_wrapper}>
                    <Category name='Булки' category={this.props.data.filter(item => item.type === 'bun')}
                              addToCart={this.props.addToCart}/>
                    <Category name='Соусы' category={this.props.data.filter(item => item.type === 'sauce')}
                              addToCart={this.props.addToCart}/>
                    <Category name='Начинки' category={this.props.data.filter(item => item.type === 'main')}
                              addToCart={this.props.addToCart}/>
                </div>
            </section>
        );
    }
}

export default BurgerIngredients;