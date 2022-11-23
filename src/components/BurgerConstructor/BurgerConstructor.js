import React from "react";
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';
import PropTypes from "prop-types";

const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
});

class BurgerConstructor extends React.Component {

    render() {
        const total = this.props.ingredients.reduce((acc, i) => acc + i.price, 0) + (this.props.bun ? this.props.bun.price * 2 : 0);

        return (
            <section className={`${burgerConstructor.burgerConstructor} mt-25`}>
                <div className='ml-8'>
                    {this.props.bun && <ConstructorElement
                        type="top"
                        text={`${this.props.bun.name} (верх)`}
                        price={this.props.bun.price}
                        thumbnail={this.props.bun.image}
                        isLocked={true}
                    />}
                </div>
                <ul className={burgerConstructor.list}>
                    {this.props.ingredients.length > 0 && this.props.ingredients.map((ingredient, index) =>
                        <li key={index} className={`${burgerConstructor.list_item}`}>
                            <DragIcon type="primary"/>
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => this.props.clearCart(ingredient)}
                            />
                        </li>
                    )}
                </ul>
                <div className='ml-8 mb-10'>
                    {this.props.bun && <ConstructorElement
                        type="bottom"
                        text={`${this.props.bun.name} (низ)`}
                        price={this.props.bun.price}
                        thumbnail={this.props.bun.image}
                        isLocked={true}
                    />}
                </div>
                <div className={burgerConstructor.checkout}>
                    <div className='mr-10'><span
                        className='mr-2 text text_type_digits-medium'>{total}</span><CurrencyIcon type="default"/></div>
                    <Button htmlType="button" type="primary" size="medium">Оформить заказ</Button>
                </div>
            </section>
        );
    }
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(dataPropTypes)
}

export default BurgerConstructor;