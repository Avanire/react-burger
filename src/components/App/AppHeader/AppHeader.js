import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon,  } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeader from './AppHeader.module.css';

class AppHeader extends React.Component {

    render() {
        return (
            <header className={appHeader.header}>
                <nav className={`${appHeader.nav}`}>
                    <a href="src/components/App/AppHeader/AppHeader#" className={`${appHeader.item_active} mr-2 pt-4 pr-5 pb-4 pl-5 text text_type_main-default`}>
                        <BurgerIcon type="primary" />
                        <span className='pl-2'>Конструктор</span>
                    </a>
                    <a href="src/components/App/AppHeader/AppHeader#" className={`${appHeader.item} text text_type_main-default`}><ListIcon type="secondary" /><span className='pl-2'>Лента заказов</span></a>
                </nav>
                <a href="/Git/ya_prakt/react-burger/public">
                    <Logo/>
                </a>
                <a className={`${appHeader.login} text text_type_main-default`} href='src/components/App/AppHeader/AppHeader'><ProfileIcon type="secondary" /><span className='pl-2'>Личный кабинет</span></a>
            </header>
        );
    }
}

export default AppHeader;