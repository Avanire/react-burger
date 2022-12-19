import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {resetPasswordRequest} from "../../utils/burger-api";

const ResetPassword = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);

    const onPassIconClick = () => {
        setPasswordShow(!passwordShow);
    }

    const handleClick = (e) => {
        e.preventDefault();

        resetPasswordRequest(password, code).then(res => {
            if (res && res.success) {
                console.log(res)
            }
        });
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