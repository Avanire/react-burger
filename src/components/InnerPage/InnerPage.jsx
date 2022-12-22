import React from "react";
import styles from "./InnerPage.module.css";
import {Redirect, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const InnerPage = ({children}) => {
    const isAuth = useSelector(state => state.auth.isAuth);
    const history = useHistory();
    const prevLink = history.location.state?.from.pathname || '/';

    return (
        isAuth ? (<Redirect to={{pathname: `${prevLink}`}} />) : (<section className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </section>)
    );
}

export default InnerPage;