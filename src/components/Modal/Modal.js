import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './Modal.module.css';
import PropTypes from "prop-types";
import {ESC_KEYCODE} from '../../utils/constans';
import ModalOverlay from "../App/ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals");

const ModalHeader = ({onClose}) => {
    return (
        <div className={`${modal.closeIcon} pt-15 pr-10`}><CloseIcon type='primary' onClick={onClose}/></div>
    );
}

ModalHeader.propTypes = {
    onClose: PropTypes.func.isRequired
}



const Modal = ({children, onClose}) => {
    const close = e => {
        if (e.keyCode === ESC_KEYCODE) {
            onClose();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', close);

        return () => {
            window.removeEventListener('keydown', close);
        }
    }, []);

    return ReactDOM.createPortal(
        (<>
            <ModalOverlay onClose={onClose}/>
            <section className={`${modal.modal}`}>
                <ModalHeader onClose={onClose}/>
                {children}
            </section>
        </>),
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
}

export default Modal;