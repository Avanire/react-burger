import modalOverlay from "./ModalOverlay.module.css";
import React, {FC} from "react";
import {TModal} from "../../utils/prop-types";

const ModalOverlay: FC<TModal> = ({onClose}) => {
    return (
        <div className={modalOverlay.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;