import React, {ComponentType, PropsWithChildren, useCallback, useMemo, useState} from 'react';

import ModalRenderer from './modal-renderer';
import {ModalHook, ModalProps} from './quick-modal';

export type IModalContext = {
    component: ComponentType<ModalProps> | null;
    props: object;
    showModal: ModalHook['showModal'];
    hideModal: ModalHook['hideModal'];
};

export const ModalContext = React.createContext<IModalContext>({
    component: null,
    props: {},
    showModal(): void {},
    hideModal(): void {},
});

export const ModalProvider = ({children}: PropsWithChildren) => {
    const [component, setComponent] = useState<ComponentType<ModalProps> | null>(null);
    const [props, setProps] = useState<object>({});

    const showModal: ModalHook['showModal'] = useCallback((component, props) => {
        setComponent(component as ComponentType<ModalProps>);
        setProps(props ?? {});
    }, []);

    const hideModal = useCallback(() => {
        setProps({});
        setComponent(null);
    }, []);

    const context = useMemo(
        () => ({
            props,
            component,
            showModal,
            hideModal,
        }),
        [props, component, showModal, hideModal],
    );

    return (
        <ModalContext.Provider value={context}>
            <ModalRenderer />
            {children}
        </ModalContext.Provider>
    );
};
