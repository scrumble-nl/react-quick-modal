import React from 'react';

import {ModalConsumer} from './modal-consumer';

const ModalRenderer = (): JSX.Element => (
    <ModalConsumer>
        {({component: Component, props, hideModal}) =>
            Component ? <Component {...props} hideModal={hideModal} /> : null
        }
    </ModalConsumer>
);

export default ModalRenderer;
