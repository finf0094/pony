import styles from './Input.module.scss';
import { classNames } from '../../core/lib/classNames';
import { factory } from '../../core/lib/factory';
import {HasAlign, HasFullWidth, SizeType} from '../../types';
import {CSSProperties} from "react";

type InputVariant = 'default' | 'filled' | 'clear';

interface InputCssVariables extends CSSProperties {
    '--input-text-align'?: string;
    '--input-height'?: string;
    '--input-padding-y'?: string;
}

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
        HasAlign,
        HasFullWidth {
    size?: SizeType
    before?: React.ReactNode;
    after?: React.ReactNode;
    variant?: InputVariant;
}

export const Input = factory<'input', InputProps>(
    (
        {
            as: Component = 'input',
            align = 'left',
            variant = 'default',
            size = 'sm',
            fullWidth = false,
            className,
            before,
            after,
            style,
            ...rest
        },
        ref,
    ) => {

        const inputCssVars: InputCssVariables = {
            ...style,
            '--input-text-align': align,
            '--input-height': `var(--input-height-${size})`,
            '--input-padding-y': `var(--input-height-y-${size}`,
        }

        return (
            <div
                className={classNames(
                    styles.Input__Wrapper,
                    styles[variant],
                    before && styles['Input__before'],
                    after && styles['Input__after'],
                    fullWidth && styles['Input__fullwidth'],
                    className,
                )}
                style={inputCssVars}
            >
                {before && (
                    <span className={classNames(styles['Input__before'])}>
                        {before}
                    </span>
                )}
                <Component
                    {...rest}
                    ref={ref}
                    className={classNames(
                        styles.Input,
                        fullWidth && styles['Input__fullwidth'],
                    )}
                />
                {after && (
                    <span className={classNames(styles['Input__after'])}>
                        {after}
                    </span>
                )}
                <span aria-hidden className={styles['Input__border']} />
            </div>
        );
    },
);
