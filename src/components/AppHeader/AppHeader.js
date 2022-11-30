import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon,} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

const AppHeader = () => {

    return (
        <header className={appHeader.header}>
            <nav className={`${appHeader.nav}`}>
                <span
                    className={`${appHeader.item_active} mr-2 pt-4 pr-5 pb-4 pl-5 text text_type_main-default`}>
                    <BurgerIcon type="primary"/>
                    <span className='pl-2'>Конструктор</span>
                </span>
                <span className={`${appHeader.item} text text_type_main-default`}><ListIcon
                    type="secondary"/><span className='pl-2'>Лента заказов</span></span>
            </nav>
            <Logo/>
            <span className={`${appHeader.login} text text_type_main-default`}><ProfileIcon
                type="secondary"/><span className='pl-2'>Личный кабинет</span></span>
        </header>
    );

}

export default AppHeader;