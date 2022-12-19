import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {forgotPasswordRequest} from "../../utils/burger-api";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleClick = (e) => {
        e.preventDefault();

        forgotPasswordRequest(email).then(res => {
            if (res && res.success) {
                console.log(res);
            }
        })
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
            <Input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='Укажите e-mail'
                   extraClass="mb-6"/>
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'
                    onClick={handleClick}>Восстановить</Button>
            <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login'
                                                                                                   className='link'>Войти</Link>
            </p>
        </>
    );
}

export default ForgotPassword;