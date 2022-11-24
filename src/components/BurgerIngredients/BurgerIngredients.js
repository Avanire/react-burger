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
            ingredient.count = 2;
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

const BurgerIngredients = ({data, addToCart}) => {
    const [currentTab, setCurrentTab] = React.useState('rolls');
    const [lockBun, setLockBun] = React.useState(false);
    const rollsTab = React.useRef(null);
    const fillingsTab = React.useRef(null);
    const sauceTab = React.useRef(null);

    const scrollToSauces = (value) => {
        setCurrentTab(value);
        sauceTab.current.scrollIntoView({behavior: 'smooth'});
    }

    const scrollToRolls = (value) => {
        setCurrentTab(value);
        rollsTab.current.scrollIntoView({behavior: 'smooth'});
    }
    const scrollToFillings = (value) => {
        setCurrentTab(value);
        fillingsTab.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <section className={`${burgerIngredients.ingredients} mr-10`}>
            <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
            <div style={{display: 'flex'}} className='mb-10'>
                <Tab value="rolls" active={currentTab === 'rolls'} onClick={(value) => scrollToRolls(value)}>
                    Булки
                </Tab>
                <Tab value="fillings" active={currentTab === 'fillings'} onClick={(value) => scrollToFillings(value)}>
                    Начинки
                </Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={(value) => scrollToSauces(value)}>
                    Соусы
                </Tab>
            </div>
            <div className={`${burgerIngredients.category_wrapper} custom-scroll`}>
                <section ref={rollsTab}>
                    <h2 className='text text_type_main-medium mb-6'>Булки</h2>
                    <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                        {data.filter(item => item.type === 'bun').map(item => (
                            <Card key={item._id} ingredient={item} addToCart={addToCart} lockBun={lockBun}
                                  setLockBun={setLockBun}/>
                        ))}
                    </div>
                </section>
                <section ref={fillingsTab}>
                    <h2 className='text text_type_main-medium mb-6'>Начинки</h2>
                    <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                        {data.filter(item => item.type === 'main').map(item => (
                            <Card key={item._id} ingredient={item} addToCart={addToCart} lockBun={lockBun}
                                  setLockBun={setLockBun}/>
                        ))}
                    </div>
                </section>
                <section ref={sauceTab}>
                    <h2 className='text text_type_main-medium mb-6'>Соусы</h2>
                    <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                        {data.filter(item => item.type === 'sauce').map(item => (
                            <Card key={item._id} ingredient={item} addToCart={addToCart} lockBun={lockBun}
                                  setLockBun={setLockBun}/>
                        ))}
                    </div>
                </section>
            </div>
        </section>
    );

}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerIngredients;