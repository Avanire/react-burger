import React, {FC, useMemo} from "react";
import styles from './FeedCard.module.css';
import {CurrencyIcon, FormattedDate} from '@ya.praktikum/react-developer-burger-ui-components';
import {IFeedCard} from "../../utils/prop-types";
import {useAppSelector} from "../../hooks/hooks";

const FeedCard: FC<IFeedCard> = ({number, time, name, ingredientsIds}) => {
    const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);

    const orderIngredient = useMemo(() => {
        return ingredientsIds.map(item => ingredients.find(i => i._id === item));
    }, [ingredientsIds]);

    const totalPrice = useMemo(() => {
        return orderIngredient.reduce((acc, cur) => {
            if (cur) {
                return acc + cur.price;
            } else {
                return 0;
            }
        }, 0);
    }, [orderIngredient]);

    return (
        <section className={`${styles.card} p-6`}>
            <div className={`${styles.order} mb-6`}>
                <span className={`text text_type_digits-default`}>#{number}</span>
                <span className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(time)} /></span>
            </div>
            <div className={`text text_type_main-medium mb-6`}>{name}</div>
            <div className={`${styles.ingredients}`}>
                <div
                    className={`${styles.ingredientImage} mr-6`}>
                    {
                        orderIngredient.slice(0, 5).map((item, index) => item &&
                            <span className={`${styles.image}`} style={{zIndex: `${1000 - index}`}}><img
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
        </section>
    );
}

export default FeedCard;