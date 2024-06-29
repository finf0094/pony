import {classNames} from "../../core/lib/classNames";
import {factory} from "../../core/lib/factory";
import {SizeType} from "../../types";

import styles from './Anchor.module.scss'

type AnchorColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

interface AnchorCssVariables extends React.CSSProperties {
    '--anchor-font-size': string;
    '--anchor-color': string;
}

interface AnchorProps extends React.HTMLAttributes<HTMLAnchorElement> {
    underline?: 'always' | 'hover' | 'never';
    fontSize?: SizeType;
    color?: AnchorColor;
}

const getColor = (color: AnchorColor) => {
    switch (color) {
        case 'default':
            return 'var(--chi-color-anchor)';
        case "error":
        case "success":
        case "primary":
        case "warning":
            return `var(--chi-color-${color})`;
    }
}

export const Anchor = factory<'a', AnchorProps>((
    {
        as: Component = 'a',
        fontSize = 'sm',
        underline = 'hover',
        color = 'default',
        className,
        ...rest
    }, ref) => {

    const anchorCssVars: AnchorCssVariables = {
        '--anchor-font-size': `var(--font-size-${fontSize})`,
        '--anchor-color': getColor(color)
    }

    return (
        <Component
            {...rest}
            ref={ref}
            className={classNames(
                styles.root,
                styles[`underline-${underline}`],
                className
            )}
            style={anchorCssVars}
        />
    )
})