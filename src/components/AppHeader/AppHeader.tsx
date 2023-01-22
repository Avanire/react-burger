import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';
import {Link, NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
        <header className={appHeader.header}>
            <nav className={`${appHeader.nav}`}>
                <span
                    className={`${appHeader.item_active} mr-2 pt-4 pr-5 pb-4 pl-5 text text_type_main-default`}>
                    <BurgerIcon type="primary"/>
                    <NavLink exact to='/' activeClassName={appHeader.item_active}
                             className={`${appHeader.item} pl-2`}>Конструктор</NavLink>
                </span>
                <span className={`${appHeader.item} text text_type_main-default`}>
                    <ListIcon type="secondary"/>
                    <NavLink exact to='/feed' activeClassName={appHeader.item_active}
                             className={`${appHeader.item} pl-2`}>Лента заказов</NavLink>
                </span>
            </nav>
            <Link to='/'><Logo/></Link>
            <span className={`${appHeader.login} text text_type_main-default`}><
                ProfileIcon type="secondary"/>
                <NavLink exact to='/profile' activeClassName={appHeader.item_active} className={`${appHeader.item} pl-2`}>Личный кабинет</NavLink>
            </span>
        </header>
    );

}

export default AppHeader;