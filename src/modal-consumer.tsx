import React from 'react';

import {ModalContext} from './modal-provider';

export const ModalConsumer = ({children}): JSX.Element => (
    <ModalContext.Consumer>{context => children(context)}</ModalContext.Consumer>
);

export const withModal = Comp => props => (
    <ModalConsumer>{context => <Comp modal={context} {...props} />}</ModalConsumer>
);
