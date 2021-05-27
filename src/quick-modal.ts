export {default as Modal} from './modal';
export {ModalProvider} from './modal-provider';
export {withModal, useModal} from './modal-consumer';

export type ModalPropsWith = {
    modal: {
        showModal(component: (props: any) => JSX.Element, props?: object): void;
        hideModal(): void;
    };
};

export type ModalHook = {
    showModal(component: (props: any) => JSX.Element, props?: object): void;
    hideModal(): void;
};

export type ModalProps = {
    hideModal(): void;
};
