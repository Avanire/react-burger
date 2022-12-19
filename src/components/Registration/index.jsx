import React, {useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registration} from "../../services/actions/Auth";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const dispatch = useDispatch();

    const onPassIconClick = () => {
        setPasswordShow(!passwordShow);
    }

    const handleClick = (e) => {
        e.preventDefault();

        dispatch(registration(email, password, name));
    }

    return (
        <>
            <div className={`text text_type_main-medium mb-6`}>Регистрация</div>
            <Input value={name}
                   onChange={e => setName(e.target.value)}
                   type='text'
                   placeholder='Имя'
                   extraClass="mb-6"
            />
            <Input value={email}
                   onChange={e => setEmail(e.target.value)}
                   type='email'
                   placeholder='E-mail'
                   extraClass="mb-6"
            />
            <Input value={password}
                   onChange={e => setPassword(e.target.value)}
                   type={passwordShow ? 'text' : 'password'}
                   placeholder='Пароль'
                   extraClass="mb-6"
                   onIconClick={onPassIconClick}
                   icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
            />
            <Button htmlType="button" type="primary" size="large" extraClass='mb-20'
                    onClick={handleClick}>Зарегистрироваться</Button>
            <p className='text text_type_main-default text_color_inactive'>
                Вы — новый пользователь? <Link to='/login' className='link'>Войти</Link>
            </p>
        </>
    );
}

export default Registration;