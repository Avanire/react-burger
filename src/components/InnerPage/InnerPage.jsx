import React from "react";
import styles from "./InnerPage.module.css";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const InnerPage = ({children}) => {
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        isAuth ? (<Redirect to={{pathname: '/'}}/>) : (<section className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </section>)
    );
}

export default InnerPage;