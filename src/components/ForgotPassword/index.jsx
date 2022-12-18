import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
            <Input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Укажите e-mail'
                   extraClass="mb-6"/>
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'>Восстановить</Button>
            <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link exact to='/login' className='link'>Войти</Link></p>
        </>
    );
}

export default ForgotPassword;