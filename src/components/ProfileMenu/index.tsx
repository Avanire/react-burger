import React, {SyntheticEvent} from "react";
import styles from "../Profile/Profile.module.css";
import {Link, NavLink, useHistory} from "react-router-dom";
import {logout} from "../../services/actions/Auth";
import {useAppDispatch} from "../../hooks/hooks";

const ProfileMenu = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();

    const handleLogout = (e: SyntheticEvent) => {
        e.preventDefault();
        history.push('/login');
        dispatch(logout());
    }

    return (
        <nav className={`${styles.navigation} mr-15`}>
            <ul className={`${styles.list} mb-20`}>
                <li className={`${styles.listItem} pt-4 pb-4`}>
                    <NavLink activeClassName={styles.linkActive}
                             className={`${styles.link} text text_type_main-medium`}
                             to='/profile'
                             exact={true}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className={`${styles.listItem} pt-4 pb-4`}>
                    <NavLink activeClassName={styles.linkActive}
                             className={`${styles.link} text text_type_main-medium`}
                             to='/profile/orders'
                             exact={true}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={`${styles.listItem} pt-4 pb-4`}>
                    <Link className={`${styles.link} text text_type_main-medium`}
                          to='/login'
                          onClick={handleLogout}
                    >
                        Выход
                    </Link>
                </li>
            </ul>
            <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить
                свои персональные данные</p>
        </nav>
    );
}

export default ProfileMenu;