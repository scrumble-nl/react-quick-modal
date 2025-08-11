import React, {PropsWithChildren, useCallback, useState} from 'react';

import {Button, Dropdown, Modal as BootstrapModal} from 'react-bootstrap';

import './modal.css';
import {ModalProps, useModal} from './quick-modal';

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

type props = ModalProps &
    PropsWithChildren<{
        title: string;
        cancelButton?: modalButton;
        confirmButton?: modalButton;
        size?: 'sm' | 'lg' | 'xl';
        className?: string;
        closeOnConfirm?: boolean;
        keyboard?: boolean;
    }>;

const Modal = ({
    cancelButton,
    confirmButton,
    className,
    size,
    keyboard,
    title,
    children,
    closeOnConfirm = true,
    hideModal,
}: props) => {
    const [show, setShow] = useState(true);
    const {displayMode, setDisplayMode, containerRef} = useModal();

    const handleClose = useCallback(() => {
        hideModal();
        setShow(false);
    }, [hideModal]);

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
            className={`${className || ''} ${
                displayMode === 'drawer' ? 'modal-drawer' : displayMode === 'fullscreen' ? 'modal-fullscreen' : ''
            }`}
            show={show}
            onHide={handleClose}
            size={size}
            container={displayMode === 'fullscreen' && containerRef ? containerRef.current : undefined}
            keyboard={keyboard}
            backdrop={keyboard === false ? 'static' : undefined}
        >
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
                <Dropdown className="ms-auto">
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                        &#x22EE;
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setDisplayMode('default')}>Default</Dropdown.Item>
                        <Dropdown.Item onClick={() => setDisplayMode('drawer')}>Drawer</Dropdown.Item>
                        <Dropdown.Item onClick={() => setDisplayMode('fullscreen')}>Full Screen</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
