import React from 'react';
import doneImg from '../../images/done.svg';
import orderDetail from './OrderDetail.module.css';

const OrderDetail = () => {
    const [orderNumber] = React.useState(0o34536);

    return (
        <section>
            <h1 className={`${orderDetail.title} text text_type_digits-large mb-8 mt-30`}>{orderNumber}</h1>
            <div className='text text_type_main-medium mb-15'>идентификатор заказа</div>
            <div className='mb-15'><img src={doneImg} alt="success"/></div>
            <div className='text text_type_main-default mb-2'>Ваш заказ начали готовить</div>
            <div className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной
                станции
            </div>
        </section>
    );
}

export default OrderDetail;