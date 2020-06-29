export {default as Modal} from './modal';
export {withModal} from './modal-consumer';
export {ModalProvider} from './modal-provider';

export type ModalProps = {
    modal: {
        showModal(component: (props: any) => JSX.Element, props?: object): void;
        hideModal(): void;
    };
};
