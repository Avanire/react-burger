import React, {useEffect} from 'react';
import doneImg from '../../images/done.svg';
import orderDetail from './CheckDetail.module.css';
import {getOrder} from "../../services/actions/CheckDetail";
import {GridLoader} from "react-spinners";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const CheckDetail = () => {
    const cart = useAppSelector(state => state.burgerIngredients.constructorIngredients);
    const ids = cart.map(item => item._id);
    const {number, orderRequest, orderFailed} = useAppSelector(state => state.checkDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getOrder(ids));
    }, [dispatch])

    return (
        orderRequest ? (<GridLoader color="#8a37d1"/>) : orderFailed ? (<p>Произошла ошибка. Попробуйте позже</p>) : (
            <section>
                <h1 className={`${orderDetail.title} text text_type_digits-large mb-8 mt-30`}>{number}</h1>
                <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
                <div className='mb-15'><img src={doneImg} alt="success"/></div>
                <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
                <div className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на
                    орбитальной
                    станции
                </div>
            </section>)
    );
}

export default CheckDetail;