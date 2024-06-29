import React from "react";
import styles from './Button.module.scss';
import {classNames} from '../../core/lib/classNames';
import {factory} from '../../core/lib/factory';
import {HasFontWeight, HasFullWidth, HasJustify, SizeType} from '../../types';

type ButtonVariant = 'filled' | 'outline' | 'subtle' | 'clear' | 'ghost';
type ButtonColor = 'primary' | 'error' | 'success' | 'warning';

interface ButtonCssVariables extends React.CSSProperties {
    '--font-weight': string;
    '--button-justify': string;
    '--button-height': string;
    '--button-height-x': string;
    '--button-color'?: string;
    '--button-background-color': string;
    '--button-hover-bg': string;
    '--button-border': string;
    '--button-font-size': string;
}

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        HasFullWidth,
        HasFontWeight,
        HasJustify {
    size?: SizeType | `compact-${SizeType}`;
    fontSize?: SizeType;
    variant?: ButtonVariant;
    color?: ButtonColor;
    before?: React.ReactNode;
    after?: React.ReactNode;
}

const getHoverBg = (variant: ButtonVariant, color: ButtonColor) => {
    switch (variant) {
        case "filled":
            return `var(--chi-color-${color}-filled-hover)`;
        case "outline":
            return `var(--chi-color-${color}-outline-hover)`;
        case "subtle":
            return `var(--chi-color-${color}-light-hover)`;
        case "ghost":
            return 'rgba(252, 252, 252, 1)';
        case "clear":
            return 'transparent'
    }
}

const getBackgroundColor = (variant: ButtonVariant, color: ButtonColor) => {
    switch (variant) {
        case "filled":
            return `var(--chi-color-${color}-filled)`;
        case "outline":
        case "subtle":
            return 'transparent';
        case "clear":
        case "ghost":
            return 'none'
    }
}

const getColor = (variant: ButtonVariant, color: ButtonColor) => {
    switch (variant) {
        case "filled":
            return 'var(--chi-color-filled)';
        case "outline":
            return `var(--chi-color-${color}-outline)`;
        case "subtle":
            return `var(--chi-color-${color})`;
        case "ghost":
        case "clear":
            return `var(--chi-color-${color})`;
    }
}

const getBorder = (variant: ButtonVariant, color: ButtonColor) => {
    switch (variant) {
        case "outline":
            return `1px solid var(--chi-color-${color})`
        case "filled":
        case "subtle":
        case "ghost":
        case "clear":
            return `none`
    }
}

export const Button = factory<'button', ButtonProps>(
    (
        {
            as: Component = 'button',
            variant = 'filled',
            size = 'sm',
            color = 'primary',
            fontWeight = '500',
            fontSize = 'sm',
            before,
            after,
            children,
            fullWidth = false,
            justify = 'center',
            className,
            style,
            ...rest
        },
        ref,
    ) => {

        const buttonCssVars: ButtonCssVariables = {
            ...style,
            '--font-weight': fontWeight,
            '--button-justify': justify,
            '--button-height': `var(--button-height-${size})`,
            '--button-height-x': `var(--button-height-${size})`,
            '--button-font-size': `var(--font-size-${fontSize})`,
            '--button-color': getColor(variant, color),
            '--button-background-color': getBackgroundColor(variant, color),
            '--button-hover-bg': getHoverBg(variant, color),
            '--button-border': getBorder(variant, color),
        }

        return (
            <Component
                {...rest}
                ref={ref}
                className={classNames(
                    styles.Button,
                    fullWidth && styles['Button__fullWidth'],
                    before && styles['Button__before'],
                    after && styles['Button__after'],
                    className,
                )}
                style={buttonCssVars}
            >
                <span className={classNames(styles['Button__inner'])}>
                    {before && (
                        <span className={classNames(styles['Button__before'])}>
                            {before}
                        </span>
                    )}
                    <span className={styles['Button__label']}>{children}</span>
                    {after && (
                        <span className={classNames(styles['Button__after'])}>
                            {after}
                        </span>
                    )}
                </span>
            </Component>
        );
    },
);