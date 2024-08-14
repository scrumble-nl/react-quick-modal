import React, {ComponentType, ReactElement, useContext} from 'react';

import {ModalHook, ModalPropsWith} from './quick-modal';
import {IModalContext, ModalContext} from './modal-provider';

type ModalConsumerProps = {
    children: any;
};

export const ModalConsumer = ({children}: ModalConsumerProps): ReactElement => (
    <ModalContext.Consumer>{context => children(context)}</ModalContext.Consumer>
);

export const withModal =
    <P extends object>(Component: ComponentType<P & ModalPropsWith>) =>
    (props: P) =>
        <ModalConsumer>{(context: IModalContext) => <Component modal={context} {...props} />}</ModalConsumer>;

export const useModal = (): ModalHook => {
    const {showModal, hideModal} = useContext(ModalContext);

    return {showModal, hideModal};
};
