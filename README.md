# Quick-Modal
A quick and easy wrapper around react-bootstrap modal, you can add or remove a modal from anywhere in your application with a few simple steps.

## Quick
![alt text](https://scrumble.nl/wp-content/uploads/2020/06/quickmodal.png "Quick image")
## Installation

```sh
npm install @scrumble-nl/react-quick-modal
```
or
```sh
yarn add @scrumble-nl/react-quick-modal
```
## Usage
### Provider
Add the provider as top level as possible:
```typescript
import React from 'react';
import App from './src/app';
import {ModalProvider} from '@scrumble-nl/react-quick-modal'; // Don't forget to import this

export default class ModalApp extends React.Component<{}, {}> {
    render = (): JSX.Element => {
        return (
            <ModalProvider>
                <App/>
            </ModalProvider>
        )       
    }       
}
```
### Creating modals
First we need to create a modal with the following steps
1. Create a new (functional) component
2. Import `Modal`
3. Add `Modal` as the top level element and add the required prop `title`
    4. (optional) do more customization with the other props as shown below the snippet
4. Add content as needed

```typescript
import React from 'react';
import {Modal} from '@scrumble-nl/react-quick-modal'; // Step 2

interface props {
    additionalMessage: string;
}

export const InfoModal = (props: props): JSX.Element => {
    return (
        <Modal // Step 3
            title="Some quick info"
        >
            What a nice modal! {props.additionalMessage} // Step 4
        </Modal>
    );
};
```
#### Modal
| Name         | Type                                                                                   | Required | Description                         | Default |
|--------------|:----------------------------------------------------------------------------------------:|:----------:|:-------------------------------------| -------- |
| `title`      | string                                                                                 | *true*     | The title for the modal          | `undefined` |
| `cancelButton`       | ModalButton (as shown below)                                                                                 | *false*    | The cancel button config            | `undefined`
| `confirmButton`      | ModalButton (as shown below)  | *false*    | The confirm button config                     | `undefined`
| `size` | 'sm', 'lg', 'xl'                                                                                 | *false*    | The size of the modal | `undefined`
#### ModalButton
| Name         | Type                                                                                   | Required | Description                         | Default |
|--------------|:----------------------------------------------------------------------------------------:|:----------:|:-------------------------------------| -------- |
| `label`      | string                                                                                 | *false*     | The content for the button          | `''` |
| `callback`       | () => void                                                                                 | *false*    | The onClick callback           | `undefined`
| `variant`      | 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light', 'link', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-dark', 'outline-light' | *false*    | The button type                      | `primary` for confirm and `secondary` for cancle

### Adding modals hooks
1. Import `useModal` in the component where you want to create a modal
2. Import your freshly created modal `InfoModal`
3. Finally, you can create a modal by passing the component and its required props
```typescript
import React from 'react';
import './info-modal'; // Step 2
import {withModal, ModalPropsWith} from '@scrumble-nl/react-quick-modal'; // Step 1

const MyComponent = (): JSX.Element => {
    const {showModal, hideModal} = useModal();

    const toggleModal = (): void => {
        // Step 3
        showModal(InfoModal, {
            additionalMessage: 'My first modal',
        }); 
    }

    return (
        <button onClick={() => toggleModal()}>Show my awesome modal</button>
    )
}
```
### Adding modals class component
1. Import `withModal` in the component where you want to create a modal
2. If you are using TypeScript, import `ModalPropsWith` and extend it for your props interface
3. Add `export default withModal(MyComponent)` to the file
4. Import your freshly created modal `InfoModal`
5. Finally, you can create a modal by passing the component and its required props
```typescript
import React from 'react';
import './info-modal'; // Step 4
import {withModal, ModalPropsWith} from '@scrumble-nl/react-quick-modal'; // Step 1 (& 2)

class MyComponent extends React.Component<ModalPropsWith, {}> {

    showModal = (): void => {
        // Step 5
        this.props.modal.showModal(InfoModal, {
            additionalMessage: 'My first modal',
        }); 
    }

    render = (): JSX.Element => {
        return (
            <button onClick={this.showModal}>Show my awesome modal</button>
        )
    }
}

export default withModal(MyComponent); // Step 3
```
### Additional customization
Next to that you can override the classes `.modal-content`, `.modal-header`, `.modal-body`,  and `.modal-footer` to change the look of the modal.
## Roadmap
- [x] Packagize component
- [ ] Improve styling customizability
- [ ] Automated testing implementation
- [ ] Switch from interfaces to types

## Contributing
If you would like to see additions/changes to this package you are always welcome to add some code or improve it.

## Scrumble
This product has been originally developed by [Scrumble](https://www.scrumble.nl) for internal use. As we have been using lots of open source packages we wanted to give back to the community. We hope this helps you getting forward as much as other people helped us!
