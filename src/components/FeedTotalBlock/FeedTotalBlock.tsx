import React, {FC} from "react";
import styles from './FeedTotalBlock.module.css';

export interface IFeedTotalBlock {
    name: string;
    number: number;
}

const FeedTotalBlock: FC<IFeedTotalBlock> = ({name, number}) => {
    return (
        <>
            <div className={`text text_type_main-medium`}>{name}:</div>
            <div className={`${styles.number} text text_type_digits-large`}>{number}</div>
        </>
    );
}

export default FeedTotalBlock;