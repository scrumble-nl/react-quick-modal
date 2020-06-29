import React from 'react';

import ModalRenderer from './modal-renderer';

interface modalProps {
    onRequestClose(): void;
}

export const ModalContext = React.createContext({
    component: null,
    props: {},
    showModal(component: (props: modalProps) => JSX.Element, props?: object): void {},
    hideModal(): void {},
});

export class ModalProvider extends React.Component {
    state = {
        component: null,
        props: {},
    };

    showModal = (component: (props: modalProps) => JSX.Element, props = {}): void => {
        this.setState({
            props,
            component,
        });
    };

    hideModal = (): void => {
        this.setState({
            props: {},
            component: null,
        });
    };

    render = (): JSX.Element => {
        const context = {
            ...this.state,
            showModal: this.showModal,
            hideModal: this.hideModal,
        };

        return (
            <ModalContext.Provider value={context}>
                <ModalRenderer />
                {this.props.children}
            </ModalContext.Provider>
        );
    };
}
