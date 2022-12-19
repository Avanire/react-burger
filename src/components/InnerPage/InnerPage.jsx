import React, {useEffect} from "react";
import styles from "./InnerPage.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/utils";
import {getUser} from "../../services/actions/Auth";
import {Redirect} from "react-router-dom";

const InnerPage = ({children}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const token = getCookie('token');

    useEffect(() => {
        if (token) {
            dispatch(getUser(`Bearer ${token}`));
        }
    }, [dispatch, token]);

    return (
        user ? (<Redirect to='/' />) : (<section className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </section>)
    );
}

export default InnerPage;