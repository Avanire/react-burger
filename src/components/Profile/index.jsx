import React, {useRef, useState} from "react";
import {NavLink} from "react-router-dom";
import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './Profile.module.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const pasRef = useRef(null)
    const onPassIconClick = () => {
        setTimeout(() => pasRef.current.focus(), 0)
        //TODO показывать пароль и смену иконки HideIcon
    }

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <nav className={`${styles.navigation} mr-15`}>
                    <ul className={`${styles.list} mb-20`}>
                        <li className={`${styles.listItem} pt-4 pb-4`}><NavLink activeClassName={styles.linkActive} className={`${styles.link} text text_type_main-medium`} to='/profile'>Профиль</NavLink></li>
                        <li className={`${styles.listItem} pt-4 pb-4`}><NavLink activeClassName={styles.linkActive} className={`${styles.link} text text_type_main-medium`} to='/profile/orders'>История заказов</NavLink></li>
                        <li className={`${styles.listItem} pt-4 pb-4`}><NavLink activeClassName={styles.linkActive} className={`${styles.link} text text_type_main-medium`} to='/profile/orders/:id'>Выход</NavLink></li>
                    </ul>
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>
                <div>
                    <Input value={name}
                           onChange={e => setName(e.target.value)}
                           type='text'
                           placeholder='Имя'
                           icon={'EditIcon'}
                           extraClass='mb-6'/>
                    <Input value={login}
                           onChange={e => setLogin(e.target.value)}
                           type='text'
                           placeholder='Логин'
                           icon={'EditIcon'}
                           extraClass='mb-6'/>
                    <Input value={password}
                           onChange={e => setPassword(e.target.value)}
                           type='password'
                           placeholder='Введите код из письма'
                           ref={pasRef}
                           onClick={onPassIconClick}
                           icon={'EditIcon'}
                           extraClass='mb-6'
                    />
                </div>
            </div>
        </section>
    );
}

export default Profile;