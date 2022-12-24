import React, {useEffect, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword, resetPasswordEnter} from "../../services/actions/Auth";

const ResetPassword = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [reset, setReset] = useState(false);
    const history = useHistory();
    const prevLink = history.location?.state || '/';
    const dispatch = useDispatch();
    const {request} = useSelector(state => state.auth);

    const onPassIconClick = () => {
        setPasswordShow(!passwordShow);
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(resetPassword(password, code));
        setReset(() => true);
    }

    useEffect(() => {
        dispatch({
            type: resetPasswordEnter.type
        });
    }, [dispatch]);

    if (reset && !request) {
        return (<Redirect to='/login' />);
    }

    if (prevLink !== '/forgot-password') {
        return (<Redirect to={{ pathname: '/' }} />);
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
            <Input value={password}
                   onChange={e => setPassword(e.target.value)}
                   type={passwordShow ? 'text' : 'password'}
                   placeholder='Введите новый пароль'
                   extraClass="mb-6"
                   onIconClick={onPassIconClick}
                   icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
            />
            <Input value={code}
                   onChange={e => setCode(e.target.value)}
                   type='text'
                   placeholder='Введите код из письма'
                   extraClass="mb-6"
            />
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'
                    onClick={handleClick}>Сохранить</Button>
            <p className='text text_type_main-default text_color_inactive'>
                Вспомнили пароль? <Link to='/login' className='link'>Войти</Link>
            </p>
        </>
    );
}

export default ResetPassword;