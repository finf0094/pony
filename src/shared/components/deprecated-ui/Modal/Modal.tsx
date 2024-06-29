import {ReactNode} from 'react';

import styles from './Modal.module.scss';
import {Overlay} from '../Overlay';
import {Portal} from '../Portal/Portal';

import {classNames, useModal} from '../../core';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
    const {className, children, isOpen, onClose, lazy} = props;

    const {close, isClosing, isMounted} = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    });


    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(
                styles.Modal,
                {[styles.opened]: isOpen},
                {[styles.isClosing]: isClosing},
                className
            )}>
                <Overlay onClick={close}/>
                <div className={styles.content}>{children}</div>
            </div>
        </Portal>
    );
};
