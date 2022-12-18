import React, {useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const ResetPassword = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const pasRef = useRef(null)
    const onPassIconClick = () => {
        setTimeout(() => pasRef.current.focus(), 0)
        //TODO показывать пароль и смену иконки HideIcon
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
            <Input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Введите код из письма'
                   extraClass="mb-6" ref={pasRef} onClick={onPassIconClick} icon={'ShowIcon'}/>
            <Input value={code} onChange={e => setCode(e.target.value)} type='text' placeholder='Введите новый пароль'
                   extraClass="mb-6"/>
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'>Сохранить</Button>
            <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? <Link to='/login' className='link'>Войти</Link></p>
        </>
    );
}

export default ResetPassword;