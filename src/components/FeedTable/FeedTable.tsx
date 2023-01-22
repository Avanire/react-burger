import React, {FC} from "react";
import styles from './FeedTable.module.css';

export interface IFeedTable {
    readonly title: string;
    readonly orderNumbers: ReadonlyArray<number>;
    readonly ready?: boolean;
}

const FeedTable: FC<IFeedTable> = ({title, orderNumbers, ready = false}) => {
    return (
        <section className={`${styles.container}`}>
            <div className={`text text_type_main-medium pb-6`}>{title}:</div>
            <div className={`${styles.numbers} text text_type_digits-default custom-scroll pb-2 ${ready && styles.ready}`}>{orderNumbers.map((item: number) => <div>{item}</div>)}</div>
        </section>
    );
}

export default FeedTable;