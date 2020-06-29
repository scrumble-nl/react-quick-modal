import React from 'react';

import {ModalProps} from './quick-modal';
import {withModal} from './modal-consumer';
import {Button, Modal as BootstrapModal} from 'react-bootstrap';

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

interface props {
    title: string;
    cancelButton?: modalButton;
    confirmButton?: modalButton;
    size?: 'sm' | 'lg' | 'xl';
}

interface state {
    show: boolean;
}

class Modal extends React.Component<props & ModalProps, state> {
    state = {show: true};

    handleClose = (): void => {
        this.setState({show: false});
        this.props.modal.hideModal();
    };

    handleCancel = (): void => {
        if (this.props.cancelButton && this.props.cancelButton.callback) {
            this.props.cancelButton.callback();
        }

        this.handleClose();
    };

    handleConfirm = (): void => {
        if (this.props.confirmButton && this.props.confirmButton.callback) {
            this.props.confirmButton.callback();
        }

        this.handleClose();
    };

    render = (): JSX.Element => {
        return (
            <BootstrapModal show={this.state.show} onHide={this.handleClose.bind(this)} size={this.props.size || 'sm'}>
                <BootstrapModal.Header closeButton>
                    <BootstrapModal.Title>{this.props.title}</BootstrapModal.Title>
                </BootstrapModal.Header>
                <BootstrapModal.Body>{this.props.children}</BootstrapModal.Body>
                {this.props.cancelButton || this.props.confirmButton ? (
                    <BootstrapModal.Footer>
                        {!this.props.cancelButton || (
                            <Button
                                variant={this.props.cancelButton.variant || 'secondary'}
                                onClick={this.handleCancel}
                            >
                                {this.props.cancelButton.label || 'Cancel'}
                            </Button>
                        )}
                        {!this.props.confirmButton || (
                            <Button
                                variant={this.props.confirmButton.variant || 'primary'}
                                onClick={this.handleConfirm}
                            >
                                {this.props.confirmButton.label || 'Confirm'}
                            </Button>
                        )}
                    </BootstrapModal.Footer>
                ) : null}
            </BootstrapModal>
        );
    };
}

export default withModal(Modal);
