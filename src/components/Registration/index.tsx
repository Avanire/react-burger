import React, {SyntheticEvent, useCallback, useState} from "react";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {registration} from "../../services/actions/Auth";
import {useAppDispatch} from "../../hooks/hooks";

const Registration = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordShow, setPasswordShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onPassIconClick = () => {
        setPasswordShow(!passwordShow);
    }

    const handleClick = useCallback((e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registration(email, password, name));
    }, [dispatch, email, password, name]);

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