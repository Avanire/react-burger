import React, {useEffect} from 'react';
import doneImg from '../../images/done.svg';
import orderDetail from './OrderDetail.module.css';
import PropTypes from 'prop-types';
import {useStore} from "effector-react";
import {modelOrder} from "../../models/OrderDetails";

const OrderDetail = ({ingredientsIds}) => {
    const orderNumber = useStore(modelOrder.$orderNumber);
    const orderIsLoading = useStore(modelOrder.$orderIsLoading);
    const orderFailed = useStore(modelOrder.$orderFailed);

    useEffect(() => {
        modelOrder.orderRequest(ingredientsIds);
    }, []);

    return (
        orderIsLoading ? (<p>Загрузка...</p>) : orderFailed ? (<p>Произошла ошибка. Попробуйте позже</p>) : (<section>
            <h1 className={`${orderDetail.title} text text_type_digits-large mb-8 mt-30`}>{orderNumber}</h1>
            <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
            <div className='mb-15'><img src={doneImg} alt="success"/></div>
            <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
            <div className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной
                станции
            </div>
        </section>)
    );
}

OrderDetail.propTypes = {
    ingredientsIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default OrderDetail;