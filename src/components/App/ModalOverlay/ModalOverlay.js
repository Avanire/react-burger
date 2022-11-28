import React from "react";
import modalOverlay from './ModalOverlay.module.css';

const ModalOverlay = ({onClose}) => {
    return (
        <div className={modalOverlay.overlay} onClick={onClose}/>
    );
}

export default ModalOverlay;