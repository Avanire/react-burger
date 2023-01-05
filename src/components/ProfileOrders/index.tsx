import React from "react";
import styles from './ProfileOrders.module.css';
import ProfileMenu from "../ProfileMenu";

const ProfileOrders = () => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                <ProfileMenu/>
                <div></div>
            </div>
        </section>
    );
}

export default ProfileOrders;