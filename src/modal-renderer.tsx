import React from 'react';

import {ModalConsumer} from './modal-consumer';

const ModalRenderer = (): JSX.Element => (
    <ModalConsumer>{({component: Component, props}) => (Component ? <Component {...props} /> : null)}</ModalConsumer>
);

export default ModalRenderer;
