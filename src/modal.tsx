import React, {PropsWithChildren, useCallback, useState} from 'react';

import {Button, Modal as BootstrapModal} from 'react-bootstrap';

import {ModalPropsWith} from './quick-modal';

type buttonType =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';

type modalButton = {
    label?: string;
    callback?(): void;
    variant?: buttonType;
};

type props = PropsWithChildren<
    {
        title: string;
        cancelButton?: modalButton;
        confirmButton?: modalButton;
        size?: 'sm' | 'lg' | 'xl';
        className?: string;
        closeOnConfirm?: boolean;
        keyboard?: boolean;
    } & ModalPropsWith
>;

const Modal = ({
    modal,
    cancelButton,
    confirmButton,
    className,
    size,
    keyboard,
    title,
    children,
    closeOnConfirm = true,
}: props) => {
    const [show, setShow] = useState(true);

    const handleClose = useCallback(() => {
        modal.hideModal();
        setShow(false);
    }, [modal]);

    const handleCancel = useCallback(() => {
        if (cancelButton && cancelButton.callback) {
            cancelButton.callback();
        }

        handleClose();
    }, [handleClose, cancelButton]);

    const handleConfirm = useCallback(() => {
        if (confirmButton && confirmButton.callback) {
            confirmButton.callback();
        }

        if (closeOnConfirm) {
            handleClose();
        }
    }, [handleClose, closeOnConfirm, confirmButton]);

    return (
        <BootstrapModal
            className={className || ''}
            show={show}
            onHide={handleClose}
            size={size}
            keyboard={keyboard}
            backdrop={keyboard === false ? 'static' : undefined}
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            <BootstrapModal.Body>{children}</BootstrapModal.Body>
            {cancelButton || confirmButton ? (
                <BootstrapModal.Footer>
                    {!cancelButton || (
                        <Button variant={cancelButton.variant || 'secondary'} onClick={handleCancel}>
                            {cancelButton.label || 'Cancel'}
                        </Button>
                    )}
                    {!confirmButton || (
                        <Button variant={confirmButton.variant || 'primary'} onClick={handleConfirm}>
                            {confirmButton.label || 'Confirm'}
                        </Button>
                    )}
                </BootstrapModal.Footer>
            ) : null}
        </BootstrapModal>
    );
};

export default Modal;
