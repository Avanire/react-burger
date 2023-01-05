import React, {FC} from "react";
import styles from "./InnerPage.module.css";
import {TReactChildren} from "../../utils/prop-types";

const InnerPage: FC<TReactChildren> = ({children}) => {

    return (
        <section className={styles.wrapper}>
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}

export default InnerPage;