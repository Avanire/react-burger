import React, {FC, useEffect, useMemo} from "react";
import styles from './Feed.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {onClose, wsInitAllOrders} from "../../services/actions/WsActions";
import FeedCard from "../FeedCard/FeedCard";
import {getBurgerIngredients} from "../../services/actions/BurgerIngredients";
import FeedTable from "../FeedTable/FeedTable";
import FeedTotalBlock from "../FeedTotalBlock/FeedTotalBlock";

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, total, totalToday} = useAppSelector(state => state.ws);

    const readyOrders = useMemo(() => {
        return orders.flat().filter(item => item.status === 'done').map(item => item.number);
    }, [orders]);

    const createdOrders = useMemo(() => {
        return orders.flat().filter(item => item.status === 'created').map(item => item.number);
    }, [orders]);

    useEffect(() => {
        dispatch(wsInitAllOrders());

        return () => {
            dispatch({
                type: onClose.type
            })
        }
    }, []);

    useEffect(() => {
        dispatch(getBurgerIngredients());
    }, []);

    return (

        <section className={`${styles.container} pt-10`}>
            <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
            <div className={`${styles.feed}`}>
                <div className={`${styles.orders} custom-scroll mr-15 pr-2`}>
                    {orders.flat().map(item => <FeedCard number={item.number} time={item.createdAt} name={item.name} ingredientsIds={item.ingredients} />)}
                </div>
                <div>
                    <div className={`${styles.tables} mb-15`}>
                        <FeedTable title='Готовые' orderNumbers={readyOrders} ready={true} />
                        <FeedTable title='В работе' orderNumbers={createdOrders} />
                    </div>
                    <div className={`mb-15`}>
                        <FeedTotalBlock name='Выполнено за все время' number={total} />
                    </div>
                    <FeedTotalBlock name='Выполнено за сегодня' number={totalToday} />
                </div>
            </div>
        </section>
    );
}

export default Feed;