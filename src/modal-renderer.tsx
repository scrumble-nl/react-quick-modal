import React, {useContext} from 'react';

import {ModalContext} from './modal-provider';

const ModalRenderer = () => {
    const {component, props, hideModal} = useContext(ModalContext);
    const Component = component;

    if (Component) {
        return <Component {...props} hideModal={hideModal} />;
    }

    return null;
};

export default ModalRenderer;
