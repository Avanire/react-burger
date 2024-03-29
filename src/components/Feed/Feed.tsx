import React, {FC, useEffect, useMemo} from "react";
import styles from './Feed.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {onClose, wsInitAllOrders} from "../../services/actions/WsActions";
import FeedCard from "../FeedCard/FeedCard";
import FeedTable from "../FeedTable/FeedTable";
import FeedTotalBlock from "../FeedTotalBlock/FeedTotalBlock";
import Modal from "../Modal/Modal";
import {useHistory} from "react-router-dom";
import OrderDetail from "../OrderDetail/OrderDetail";
import {IFeedOrders} from "../../utils/prop-types";
import {addOrderModal, removeOrderModal} from "../../services/actions/OrderDetail";
import {GridLoader} from "react-spinners";

const Feed: FC = () => {
    const dispatch = useAppDispatch();
    const {orders, total, totalToday} = useAppSelector(state => state.ws);
    const [modal, setModal] = React.useState<boolean>(false);
    const history = useHistory();

    const readyOrders = useMemo(() => {
        if (orders) {
            return orders.flat().filter(item => item.status === 'done').map(item => item.number);
        }
    }, [orders]);

    const createdOrders = useMemo(() => {
        if (orders) {
            return orders.flat().filter(item => item.status === 'created').map(item => item.number);
        }
    }, [orders]);

    useEffect(() => {
        dispatch(wsInitAllOrders('all'));

        return () => {
            dispatch({
                type: onClose.type
            })
        }
    }, [dispatch]);

    const handleCloseModal = () => {
        dispatch({
            type: removeOrderModal.type
        })
        setModal(false);
        history.replace('/feed');
    }

    const handleOpenModal = (order: IFeedOrders) => {
        dispatch({
            type: addOrderModal.type,
            payload: order
        })
        setModal(true);
    }

    return (
        orders && <>
            <section className={`${styles.container} pt-10`}>
                <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
                <div className={`${styles.feed}`}>
                    <div className={`${styles.orders} custom-scroll mr-15 pr-2`}>
                        {orders.length ? orders.flat().map(item => <FeedCard key={item._id}
                                                             order={item}
                                                             handleOpenModal={handleOpenModal}
                        />) : <div className={styles.loader}><GridLoader color="#8a37d1"/></div>}
                    </div>
                    <div>
                        <div className={`${styles.tables} mb-15`}>
                            {readyOrders ? <FeedTable title='Готовые' orderNumbers={readyOrders} ready={true}/> : <GridLoader color="#8a37d1"/>}
                            {createdOrders ? <FeedTable title='В работе' orderNumbers={createdOrders}/> : <GridLoader color="#8a37d1"/>}
                        </div>
                        <div className={`mb-15`}>
                            <FeedTotalBlock name='Выполнено за все время' number={total}/>
                        </div>
                        <FeedTotalBlock name='Выполнено за сегодня' number={totalToday}/>
                    </div>
                </div>
            </section>
            {modal && <Modal onClose={handleCloseModal}><OrderDetail/></Modal>}
        </>
    );
}

export default Feed;