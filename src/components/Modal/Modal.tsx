import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './Modal.module.css';
import {ESC_KEYCODE} from '../../utils/constans';
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import {TModal} from "../../utils/prop-types";

const modalRoot = document.getElementById("react-modals")!;

const Modal: FC<TModal> = ({children, onClose}) => {
    const close = (e: KeyboardEvent) => {
        if (e.code === ESC_KEYCODE) {
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
                <div className={`${modal.closeIcon} mt-15 mr-10`}><CloseIcon type='primary' onClick={onClose}/></div>
                {children}
            </section>
        </>),
        modalRoot
    );
}

export default Modal;