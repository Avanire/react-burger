import React, {FC, useEffect, useMemo} from "react";
import styles from './FeedCard.module.css';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {IFeedCard} from "../../utils/prop-types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import uuid from "react-uuid";
import {getBurgerIngredients} from "../../services/actions/BurgerIngredients";
import {Link, useHistory} from "react-router-dom";

const FeedCard: FC<IFeedCard> = ({order, handleOpenModal}) => {
    const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);
    const dispatch = useAppDispatch();
    const history = useHistory();

    const orderIngredient = useMemo(() => {
        return order.ingredients.map(item => ingredients.find(i => i._id === item));
    }, [order.ingredients]);

    const totalPrice = useMemo(() => {
        return orderIngredient.reduce((acc, cur) => {
            if (cur) {
                return acc + cur.price;
            } else {
                return 0;
            }
        }, 0);
    }, [orderIngredient]);

    const status = order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создан' : order?.status === 'pending' ? 'В обработке' : '';

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getBurgerIngredients());
        }
    }, [dispatch, ingredients]);

    return (
        <Link to={{pathname: `${history.location.pathname}/${order._id}`, state: {popUp: history.location}}} className={`${styles.card} p-6`} onClick={() => handleOpenModal(order)}>
            <div className={`${styles.order} mb-6`}>
                <span className={`text text_type_digits-default`}>#{order.number}</span>
                <span className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(order.createdAt)} /></span>
            </div>
            <div className={`text text_type_main-medium mb-2`}>{order.name}</div>
            {history.location.pathname === '/profile/orders' ? <div className={`mb-6`}>{status}</div> : null}
            <div className={`${styles.ingredients}`}>
                <div
                    className={`${styles.ingredientImage} mr-6`}>
                    {
                        orderIngredient.slice(0, 5).map((item, index) => item &&
                            <span key={uuid()} className={`${styles.image}`} style={{zIndex: `${10 - index}`}}><img
                                src={item.image_mobile} alt={item.name}/></span>)
                    }
                    {
                        orderIngredient.length - 5 > 0 ?
                            <span className={`${styles.spreadImage}`}>
                                <span className={`${styles.overlay}`}></span>
                                <span className={`${styles.spreadCount} text text_type_main-default`}>+{orderIngredient.length - 5}</span>
                                <img src={orderIngredient.at(5)?.image_mobile} alt=""/>
                            </span> : null
                    }
                </div>
                <div className={`${styles.price} text text_type_digits-default`}>{totalPrice} <CurrencyIcon
                    type="primary"/></div>
            </div>
        </Link>
    );
}

export default FeedCard;