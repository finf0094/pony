import React, {Children, cloneElement} from 'react';
import {Paper, PaperProps} from '../Paper';
import {CardSection, CardSectionProps} from './CardSection/CardSection';
import styles from './Card.module.scss';
import {classNames} from '../../core/lib/classNames';
import {SizeType} from '@/shared/components/types';

interface CardProps extends PaperProps {
    withBorder?: boolean;
    shadow?: SizeType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
    const {
        withBorder,
        padding = 'md',
        className,
        style,
        children,
        shadow = 'sm',
        ...others
    } = props;

    const cardCssVars = {
        '--card-shadow': `var(--shadow-${shadow})`,
        '--card-padding': `var(--spacing-${padding})`,
    };

    const content = Children.toArray(children).map((child, index, arr) => {
        if (React.isValidElement(child) && child.type === CardSection) {
            return cloneElement(child, {
                'data-first-section': index === 0 || undefined,
                'data-last-section': index === arr.length - 1 || undefined,
            } as Partial<CardSectionProps>);
        }
        return child;
    });

    return (
        <Paper
            ref={ref}
            className={classNames(styles.root, className, {[styles.withBorder]: withBorder})}
            style={{...style, ...cardCssVars}}
            {...others}
        >
            {content}
        </Paper>
    );
});
