import React, {useContext} from 'react';

import {ModalHook} from './quick-modal';
import {ModalContext} from './modal-provider';

export const ModalConsumer = ({children}): JSX.Element => (
    <ModalContext.Consumer>{context => children(context)}</ModalContext.Consumer>
);

export const withModal = Comp => props => (
    <ModalConsumer>{context => <Comp modal={context} {...props} />}</ModalConsumer>
);

export const useModal = (): ModalHook => {
    const {showModal, hideModal} = useContext(ModalContext);

    return {showModal, hideModal};
};
