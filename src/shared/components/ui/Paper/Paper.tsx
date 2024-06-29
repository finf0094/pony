import React, {forwardRef} from 'react';
import styles from './Paper.module.scss';
import {classNames} from '../../core/lib/classNames';
import {SizeType} from '../../types';

type PaperColor = 'white';

interface PaperCssVariables extends React.CSSProperties {
    '--paper-radius': string;
    '--paper-padding': string;
    '--paper-bg-color': string;
}

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
    radius?: SizeType;
    padding?: SizeType;
    color?: PaperColor;
}

export const Paper = forwardRef<HTMLDivElement, PaperProps>((
    {
        radius = 'sm',
        padding = 'sm',
        color = 'white',
        style,
        ...rest
    }, ref) => {

    const paperCssVars: PaperCssVariables = {
        ...style,
        '--paper-radius': `var(--radius-${radius})`,
        '--paper-padding': `var(--spacing-${padding})`,
        '--paper-bg-color': `var(--color-${color})`,
    }

    return (
        <div
            {...rest}
            ref={ref}
            className={classNames(styles.Paper)}
            style={paperCssVars}
        />
    )
});

Paper.displayName = 'Paper';