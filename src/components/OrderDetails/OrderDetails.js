import React, {useEffect} from 'react';
import doneImg from '../../images/done.svg';
import orderDetail from './OrderDetail.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import {getOrder} from "../../services/actions/OrderDetails";

const OrderDetail = () => {
    const cart = useSelector(state => state.burgerIngredients.constructorIngredients);
    const ids = cart.map(item => item._id);
    const {number, orderRequest, orderFailed} = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrder(ids));
    }, [dispatch])

    return (
        orderRequest ? (<p>Загрузка...</p>) : orderFailed ? (<p>Произошла ошибка. Попробуйте позже</p>) : (<section>
            <h1 className={`${orderDetail.title} text text_type_digits-large mb-8 mt-30`}>{number}</h1>
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
    order: PropTypes.shape({
        isLoading: PropTypes.bool.isRequired,
        hasError: PropTypes.bool.isRequired,
        number: PropTypes.number.isRequired
    })
}

export default OrderDetail;