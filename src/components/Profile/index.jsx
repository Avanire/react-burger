import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Profile.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/utils";
import {getUser, logout, updateUser} from "../../services/actions/Auth";

const Profile = () => {
    const token = getCookie('token');
    const refreshToken = getCookie('refreshToken');

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passRef = useRef(null);

    const onPassIconClick = (target) => {
        target.current.focus();
    }

    const handleLogout = (e) => {
        e.preventDefault();

        dispatch(logout(refreshToken));
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setName(user?.name);
        setEmail(user?.email);
    }

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateUser(email, password, name, `Bearer ${token}`));
    }

    useEffect(() => {
        dispatch(getUser(`Bearer ${token}`));

        setName(user?.name);
        setEmail(user?.email);
    }, [dispatch]);

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <nav className={`${styles.navigation} mr-15`}>
                    <ul className={`${styles.list} mb-20`}>
                        <li className={`${styles.listItem} pt-4 pb-4`}>
                            <NavLink activeClassName={styles.linkActive}
                                     className={`${styles.link} text text_type_main-medium`}
                                     to='/profile'
                            >
                                Профиль
                            </NavLink>
                        </li>
                        <li className={`${styles.listItem} pt-4 pb-4`}>
                            <NavLink activeClassName={styles.linkActive}
                                     className={`${styles.link} text text_type_main-medium`}
                                     to='/profile/orders'
                            >
                                История заказов
                            </NavLink>
                        </li>
                        <li className={`${styles.listItem} pt-4 pb-4`}>
                            <NavLink activeClassName={styles.linkActive}
                                     className={`${styles.link} text text_type_main-medium`}
                                     to='/'
                                     onClick={handleLogout}
                            >
                                Выход
                            </NavLink>
                        </li>
                    </ul>
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить
                        свои персональные данные</p>
                </nav>
                <div>
                    <Input value={name}
                           onChange={e => setName(e.target.value)}
                           type='text'
                           placeholder='Имя'
                           onIconClick={() => onPassIconClick(nameRef)}
                           icon={'EditIcon'}
                           extraClass='mb-6'
                           ref={nameRef}
                    />
                    <Input value={email}
                           onChange={e => setEmail(e.target.value)}
                           type='text'
                           placeholder='Логин'
                           onIconClick={() => onPassIconClick(loginRef)}
                           icon={'EditIcon'}
                           extraClass='mb-6'
                           ref={loginRef}
                    />
                    <Input value={password}
                           onChange={e => setPassword(e.target.value)}
                           type='password'
                           placeholder='Пароль'
                           onIconClick={() => onPassIconClick(passRef)}
                           icon={'EditIcon'}
                           extraClass='mb-6'
                           ref={passRef}
                    />
                    <div className={styles.buttonBlock}>
                        <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button htmlType="button" type="primary" size="medium" onClick={handleSave}>
                            Сохранить
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;