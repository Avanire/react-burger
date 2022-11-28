import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import modal from './Modal.module.css';
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
    close = e => {
        if (e.keyCode === 27) {
            this.props.onClose();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.close);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.close);
    }

    render() {
        const {children, onClose} = this.props;

        const ModalHeader = () => {
            return (
                <div className={`${modal.closeIcon} pt-15 pr-10`}><CloseIcon type='primary' onClick={onClose}/></div>
            );
        }

        return ReactDOM.createPortal(
            (<>
                <ModalOverlay onClose={onClose}/>
                <section className={`${modal.modal}`}>
                    <ModalHeader />
                    {children}
                </section>
            </>),
            modalRoot
        );
    }
}

export default Modal;