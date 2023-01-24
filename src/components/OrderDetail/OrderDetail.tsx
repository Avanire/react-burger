import React, {FC, useEffect, useMemo} from "react";
import styles from './OrderDetail.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getBurgerIngredients} from "../../services/actions/BurgerIngredients";
import {useParams} from "react-router-dom";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {onClose, wsInitAllOrders} from "../../services/actions/WsActions";
import uuid from "react-uuid";

export interface IOrderDetail {
    readonly name?: string;
    readonly image?: string;
    readonly count?: number;
    readonly price?: number;
}

const Detail: FC<IOrderDetail> = (ingredient) => {

    return (
        <section className={`${styles.ingredientItem} mb-4`}>
            <span className={`${styles.itemImage} mr-4`}><img src={ingredient.image} alt={ingredient.name}/></span>
            <div className={`text text_type_main-default`}>{ingredient.name}</div>
            <div className={`${styles.detailPrice} text text_type_digits-default ml-auto`}>{ingredient.count} x {ingredient.price} <CurrencyIcon type="primary"/></div>
        </section>
    );
}

const OrderDetail: FC = () => {
    const ingredients = useAppSelector(state => state.burgerIngredients.ingredients);
    const orders = useAppSelector(state => state.ws.orders);
    const modalOrder = useAppSelector(state => state.orderDetail.modalOrder);
    const dispatch = useAppDispatch();
    const {id}: { id: string } = useParams();

    const order = modalOrder ? modalOrder : orders.flat().find(item => item._id === id);
    const status = order?.status === 'done' ? 'Выполнен' : order?.status === 'created' ? 'Создан' : order?.status === 'pending' ? 'В обработке' : '';
    const time = order?.createdAt;

    const orderIngredient = useMemo(() => {
        return order?.ingredients.map(item => ingredients.find(i => i._id === item));
    }, [order]);

    const temp: Array<string> = [];

    const union = useMemo(() => {
        return order?.ingredients.map((ingredient) => {

            if (!temp.includes(ingredient)) {
                temp.push(ingredient);

                return {
                    ...orderIngredient?.find(item => item?._id === ingredient),
                    count: orderIngredient?.reduce((count, item) => {
                        if (ingredient === item?._id) {
                            count++;
                        }
                        return count;
                    }, 0)
                }
            }
        })
    }, [order]);

    const totalPrice = useMemo(() => {
        return orderIngredient?.reduce((acc, cur) => {
            if (cur) {
                return acc + cur.price;
            } else {
                return 0;
            }
        }, 0);
    }, [orderIngredient]);

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getBurgerIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (!orders.length) {
            dispatch(wsInitAllOrders());
        }

        return () => {
            dispatch({
                type: onClose.type
            })
        }
    }, [dispatch]);

    return (
        <section className={`${styles.container} p-5`}>
            <div className={`${styles.number} mb-10 text text_type_digits-default`}>#{order?.number}</div>
            <div className={`mb-3 text text_type_main-medium`}>{order?.name}</div>
            <div className={`${styles.status} text text_type_main-small mb-15`}>{status}</div>
            <div className={`mb-6 text text_type_main-medium`}>Состав:</div>
            <div className={`${styles.ingredientItems} custom-scroll mb-10 pr-6`}>
                {union && union.map(item => item && <Detail key={uuid()} name={item.name} price={item.price} image={item.image_mobile} count={item.count} />)}
            </div>
            <div className={`${styles.footer}`}>
                <div className={`text text_type_main-default text_color_inactive`}>{time && <FormattedDate date={new Date(time)}/>}</div>
                <div className={`${styles.totalPrice} text text_type_digits-default`}>{totalPrice} <CurrencyIcon type="primary"/></div>
            </div>
        </section>
    );
}

export default OrderDetail;