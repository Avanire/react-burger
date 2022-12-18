import React from "react";
import styles from "./InnerPage.module.css";

const InnerPage = ({children}) => {
    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}

export default InnerPage;