import {ComponentType} from 'react';

export {default as Modal} from './modal';
export {ModalProvider} from './modal-provider';
export {withModal, useModal} from './modal-consumer';

export type ModalPropsWith = {
    modal: ModalHook;
};

export type ModalHook = {
    showModal<P extends ModalProps>(component: ComponentType<P>, props?: Omit<P, keyof ModalProps>): void;
    hideModal(): void;
};

export type ModalProps = {
    hideModal(): void;
};
