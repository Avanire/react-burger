import React, {SyntheticEvent, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {forgotPassword} from "../../services/actions/Auth";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const ForgotPassword = () => {
    const [email, setEmail] = useState<string>('');
    const isResetPass = useAppSelector(state => state.auth.isResetPass);
    const history = useHistory();
    const dispatch = useAppDispatch();

    const handleClick = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    return (
        isResetPass ? (<Redirect to={{pathname: '/reset-password', state: history.location.pathname}}/>) : (<>
            <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
            <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type='email'
                placeholder='Укажите e-mail'
                extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'
                    onClick={handleClick}>Восстановить</Button>
            <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login' className='link'>Войти</Link>
            </p>
        </>)

    );
}

export default ForgotPassword;