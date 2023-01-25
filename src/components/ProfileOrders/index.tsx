import React, {useEffect} from "react";
import styles from './ProfileOrders.module.css';
import ProfileMenu from "../ProfileMenu";
import FeedCard from "../FeedCard/FeedCard";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useHistory} from "react-router-dom";
import {onClose, wsInitAllOrders} from "../../services/actions/WsActions";
import {addOrderModal, removeOrderModal} from "../../services/actions/OrderDetail";
import {IFeedOrders} from "../../utils/prop-types";
import Modal from "../Modal/Modal";
import OrderDetail from "../OrderDetail/OrderDetail";
import {GridLoader} from "react-spinners";

const ProfileOrders = () => {
    const dispatch = useAppDispatch();
    const orders = useAppSelector(state => state.ws.orders);
    const [modal, setModal] = React.useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        dispatch(wsInitAllOrders());

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
        history.replace('/profile/orders');
    }

    const handleOpenModal = (order: IFeedOrders) => {
        dispatch({
            type: addOrderModal.type,
            payload: order
        })
        setModal(true);
    }

    return (
        orders ? <>
            <section className={styles.wrapper}>
                <div className={styles.container}>
                    <ProfileMenu/>
                    {orders.length ? (<div className={`${styles.orders} custom-scroll mr-15 pr-2`}>
                        {orders.flat().reverse().map(item => <FeedCard key={item._id}
                                                                       order={item}
                                                                       handleOpenModal={handleOpenModal}
                        />)}
                    </div>) : <div className={styles.loader}><GridLoader color="#8a37d1"/></div>}
                </div>
            </section>
            {modal && <Modal onClose={handleCloseModal}><OrderDetail/></Modal>}
        </> : null
    );
}

export default ProfileOrders;