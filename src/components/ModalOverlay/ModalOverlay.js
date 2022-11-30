import modalOverlay from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import React from "react";

const ModalOverlay = ({onClose}) => {
    return (
        <div className={modalOverlay.overlay} onClick={onClose}/>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;