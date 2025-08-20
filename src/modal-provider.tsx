import React, {ComponentType, PropsWithChildren, useCallback, useMemo, useState} from 'react';

import ModalRenderer from './modal-renderer';
import {DisplayMode, ModalHook, ModalProps} from './quick-modal';

export type IModalContext = {
    component: ComponentType<ModalProps> | null;
    props: object;
    showModal: ModalHook['showModal'];
    hideModal: ModalHook['hideModal'];
    displayMode: DisplayMode;
    setDisplayMode: (mode: DisplayMode) => void;
    containerRef?: React.RefObject<HTMLElement | null>;
};

export const ModalContext = React.createContext<IModalContext>({} as IModalContext);

const getInitialDisplayMode = (): DisplayMode => {
    if (typeof window !== 'undefined') {
        const storedMode = localStorage.getItem('modalDisplayMode');
        if (storedMode === 'drawer' || storedMode === 'fullscreen') {
            return storedMode;
        }
    }
    return 'default';
};

type ModalProviderProps = PropsWithChildren<{
    containerRef?: React.RefObject<HTMLElement | null>;
}>;

export const ModalProvider = ({children, containerRef}: ModalProviderProps) => {
    const [component, setComponent] = useState<ComponentType<ModalProps> | null>(null);
    const [props, setProps] = useState<object>({});
    const [displayMode, setDisplayModeState] = useState<DisplayMode>(getInitialDisplayMode());

    const showModal: ModalHook['showModal'] = useCallback((component, props) => {
        setComponent(() => component as ComponentType<ModalProps>);
        setProps(props ?? {});
    }, []);

    const hideModal = useCallback(() => {
        setProps({});
        setComponent(null);
    }, []);

    const setDisplayMode = useCallback((mode: DisplayMode) => {
        setDisplayModeState(mode);
        if (typeof window !== 'undefined') {
            localStorage.setItem('modalDisplayMode', mode);
        }
    }, []);

    const context = useMemo(
        () => ({
            props,
            component,
            showModal,
            hideModal,
            displayMode,
            setDisplayMode,
            containerRef,
        }),
        [props, component, showModal, hideModal, displayMode, setDisplayMode, containerRef],
    );

    return (
        <ModalContext.Provider value={context}>
            <ModalRenderer />
            {children}
        </ModalContext.Provider>
    );
};
