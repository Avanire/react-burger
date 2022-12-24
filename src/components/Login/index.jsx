import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../services/actions/Auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const onPassIconClick = () => {
        setPasswordShow(!passwordShow);
    }

    const handleEnter = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Вход</div>
            <Input value={email}
                   onChange={e => setEmail(e.target.value)}
                   type='email'
                   placeholder='E-mail'
                   extraClass="mb-6"/>
            <Input value={password}
                   onChange={e => setPassword(e.target.value)}
                   type={passwordShow ? 'text' : 'password'}
                   placeholder='Пароль'
                   extraClass="mb-6"
                   onIconClick={onPassIconClick}
                   icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
            />
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20' onClick={handleEnter}>
                Войти
            </Button>
            <p className='text text_type_main-default text_color_inactive'>
                Вы — новый пользователь? <Link to='/register' className='link'>Зарегистрироваться</Link>
            </p>
            <p className='text text_type_main-default text_color_inactive'>
                Забыли пароль? <Link to={{ pathname:'/forgot-password', from: history.location.state?.from }} className='link'>Восстановить пароль</Link>
            </p>
        </>
    );
}

export default Login;