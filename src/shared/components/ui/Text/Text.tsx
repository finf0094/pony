import React, {CSSProperties} from 'react';

import styles from './Text.module.scss';
import {classNames} from '../../core/lib/classNames';
import {factory} from '../../core/lib/factory';
import {HasFontWeight, SizeType} from '../../types';

type TextColor = 'primary' | 'success' | 'error' | 'default';

interface TextCssVariables extends CSSProperties {
    '--font-weight'?: string | number;
    '--font-size'?: string;
    '--text-color'?: string;
}

export interface TextProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'size'>,
        HasFontWeight {
    fontSize?: SizeType;
    color?: TextColor;
}

export const Text = factory<'span', TextProps>(
    (
        {
            as: Component = 'span',
            fontSize = 'sm',
            fontWeight = '400',
            color = 'dark',
            className,
            style,
            ...rest
        },
        ref,
    ) => {

        const textCssVars: TextCssVariables = {
            ...style,
            '--font-weight': fontWeight,
            '--font-size': `var(--font-size-${fontSize})`,
            '--text-color': `var(--chi-color-${color}`
        }

        return (
            <Component
                {...rest}
                ref={ref}
                className={classNames(
                    styles.Text,
                    styles[color],
                    className,
                )}
                style={textCssVars}
            />
        );
    },
);
