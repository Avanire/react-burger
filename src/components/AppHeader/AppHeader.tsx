import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';
import {Link, NavLink, useLocation} from "react-router-dom";

const AppHeader = () => {
    const location = useLocation();

    return (
        <header className={appHeader.header}>
            <nav className={`${appHeader.nav}`}>
                <span
                    className={`${appHeader.item_active} mr-2 pt-4 pr-5 pb-4 pl-5 text text_type_main-default`}>
                    {location.pathname === '/' ? <BurgerIcon type="primary" /> : <BurgerIcon type="secondary" />}
                    <NavLink exact to='/' activeClassName={appHeader.item_active}
                             className={`${appHeader.item} pl-2`}>Конструктор</NavLink>
                </span>
                <span className={`${appHeader.item} text text_type_main-default`}>
                   {location.pathname === '/feed' ? <ListIcon type="primary" /> : <ListIcon type="secondary" />}
                    <NavLink exact to='/feed' activeClassName={appHeader.item_active}
                             className={`${appHeader.item} pl-2`}>Лента заказов</NavLink>
                </span>
            </nav>
            <Link to='/'><Logo/></Link>
            <span className={`${appHeader.login} text text_type_main-default`}>
                {location.pathname === '/profile' ? <ProfileIcon type="primary" /> : <ProfileIcon type="secondary" />}
                <NavLink exact to='/profile' activeClassName={appHeader.item_active} className={`${appHeader.item} pl-2`}>Личный кабинет</NavLink>
            </span>
        </header>
    );

}

export default AppHeader;