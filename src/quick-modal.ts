import {ComponentType} from 'react';

export {default as Modal} from './modal';
export {ModalProvider} from './modal-provider';
export {withModal, useModal} from './modal-consumer';

export type ModalPropsWith = {
    modal: ModalHook;
};

export type DisplayMode = 'default' | 'drawer' | 'fullscreen';

export type ModalHook = {
    showModal<P extends ModalProps>(component: ComponentType<P>, props?: Omit<P, keyof ModalProps>): void;
    hideModal(): void;
    displayMode: DisplayMode;
    setDisplayMode: (mode: DisplayMode) => void;
    containerRef?: React.RefObject<HTMLElement | null>;
};

export type ModalProps = {
    hideModal(): void;
};
