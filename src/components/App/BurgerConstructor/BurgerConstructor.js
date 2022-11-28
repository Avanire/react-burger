import React from "react";
import {
    ConstructorElement,
    CurrencyIcon,
    Button,
    DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css';
import PropTypes from "prop-types";
import dataPropTypes from '../../../utils/prop-types';

const BurgerConstructor = ({cart, clearCart, openModal}) => {
    const bun = cart.find(i => i.type === 'bun');

    const total = cart.reduce((acc, i) => acc + i.price, 0) + (bun ? bun.price * 2 : 0);
    return (
        <section className={`${burgerConstructor.burgerConstructor} mt-25`}>
            <div className='ml-8'>
                {bun ? (<ConstructorElement
                    type="top"
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    isLocked={true}
                />) : (<div
                    className={`${burgerConstructor.skeleton_constructor} constructor-element constructor-element_pos_top`}>
                            <span className="constructor-element__row">
                                <span className="constructor-element__text">Выберете булку (верх)</span>
                            </span>
                </div>)}
            </div>
            <ul className={`${burgerConstructor.list} custom-scroll`}>
                {cart.filter(c => c.type !== 'bun').length > 0 ? (cart.filter(c => c.type !== 'bun').map((ingredient, index) =>
                    <li key={index} className={`${burgerConstructor.list_item}`}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                            handleClose={() => clearCart(ingredient)}
                        />
                    </li>
                )) : (<div className={`${burgerConstructor.skeleton_constructor} constructor-element ml-8`}>
                            <span className={`constructor-element__row`}>
                                <span className="constructor-element__text">Выберите ингридиент</span>
                            </span>
                </div>)}
            </ul>
            <div className='ml-8 mb-10'>
                {bun ? (<ConstructorElement
                    type="bottom"
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                    isLocked={true}
                />) : (<div
                    className={`${burgerConstructor.skeleton_constructor} constructor-element constructor-element_pos_bottom`}>
                            <span className="constructor-element__row">
                                <span className="constructor-element__text">Выберете булку (низ)</span>
                            </span>
                </div>)}
            </div>
            <div className={burgerConstructor.checkout}>
                <div className='mr-10'><span
                    className='mr-2 text text_type_digits-medium'>{total}</span><CurrencyIcon type="default"/></div>
                <Button htmlType="button" type="primary" size="medium" onClick={openModal}>Оформить заказ</Button>
            </div>
        </section>
    );

}

BurgerConstructor.propTypes = {
    cart: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerConstructor;