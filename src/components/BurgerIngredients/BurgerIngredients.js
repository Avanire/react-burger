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
})

const Card = ({image, imageMobile, imageLarge, price, name, count}) => {
    function counter() {

    }

    return (
        <section className={`${burgerIngredients.product}`} onClick={this.props.addToCart}>
            <span className="counter">{count && <Counter count={count} size="default" extraClass="m-1" />}</span>
            <div className={burgerIngredients.image}>
                <picture>
                    <source srcSet={imageMobile} media="(max-width: 375px)"/>
                    <source srcSet={imageLarge} media="(max-width: 1920px)"/>
                    <img src={image} alt={name} style={{width: '100%'}}/>
                </picture>
            </div>
            <div className={burgerIngredients.price}><span className='text text_type_digits-default pr-2 mt-1 mb-1'>{price}</span><CurrencyIcon type="primary"/></div>
            <div className={`text text_type_main-default ${burgerIngredients.name}`}>{name}</div>
        </section>
    );
}

const Category = ({name, category}) => {
    return (
        <section>
            <h2 className='text text_type_main-medium mb-6'>{name}</h2>
            <div className={`${burgerIngredients.container} mb-10 ml-4`}>
                {
                    category.map(item => <Card key={item._id} image={item.image} imageMobile={item.image_mobile}
                                               imageLarge={item.image_large} price={item.price}
                                               name={item.name}/>)
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
        currentTab: 'rolls'
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
                    <Category name='Булки' category={this.props.data.filter(item => item.type === 'bun')}/>
                    <Category name='Соусы' category={this.props.data.filter(item => item.type === 'sauce')}/>
                    <Category name='Начинки' category={this.props.data.filter(item => item.type === 'main')}/>
                </div>
            </section>
        );
    }
}

export default BurgerIngredients;