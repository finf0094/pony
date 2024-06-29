import React, {Children, cloneElement, isValidElement} from "react";

import {factory} from "../../core/lib/factory";
import {classNames} from "../../core/lib/classNames";
import {SizeType} from "../../types";
import styles from './Breadcrumbs.module.scss'

interface BreadcrumbsCssVariables extends React.CSSProperties {
    '--bc-separator-margin'?: string;
}

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
    separator?: React.ReactNode;
    separatorMargin?: SizeType;
}

export const Breadcrumbs = factory<'div', BreadcrumbsProps>((
    {
        as: Component = 'div',
        children,
        separator = '→',
        separatorMargin= 'xs',
        ...rest
    }, ref) => {

    const breadcrumbsCssVars: BreadcrumbsCssVariables = {
        '--bc-separator-margin': `var(--spacing-${separatorMargin})`,
    }

    const items = Children.toArray(children).reduce<React.ReactNode[]>((acc, child, index, array) => {
        const item = isValidElement(child) ? (
            cloneElement(child as React.ReactElement, {
                className: classNames(styles.breadcrumb, child.props?.className),
                key: index,
            })
        ) : (
            <div className={styles.breadcrumb} key={index}>
                {child}
            </div>
        );
        acc.push(item);

        if (index !== array.length - 1) {
            acc.push(
                <div
                    className={styles.separator}
                    key={`separator-${index}`}
                    style={breadcrumbsCssVars}
                >
                    {separator}
                </div>
            );
        }

        return acc;
    }, []);

    return (
        <Component className={styles.root} {...rest} ref={ref}>
            {items}
        </Component>
    )
})