import React, {useRef, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');
    const pasRef = useRef(null)
    const onPassIconClick = () => {
        setTimeout(() => pasRef.current.focus(), 0)
        //TODO показывать пароль и смену иконки HideIcon
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Вход</div>
            <Input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='E-mail'
                   extraClass="mb-6"/>
            <Input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Пароль'
                   extraClass="mb-6" ref={pasRef} onClick={onPassIconClick} icon={'ShowIcon'}/>
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'>Войти</Button>
            <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? <Link to='/register' className='link'>Зарегистрироваться</Link></p>
            <p className='text text_type_main-default text_color_inactive'>Забыли пароль? <Link to='/forgot-password' className='link'>Восстановить пароль</Link></p>
        </>
    );
}

export default Login;