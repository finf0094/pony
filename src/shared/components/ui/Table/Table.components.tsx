import React from 'react';
import { useTableContext } from './Table.context';
import { classNames } from '../../core/lib/classNames';
import styles from './Table.module.scss';

interface TableElementProps extends React.HTMLAttributes<HTMLElement> {
    columnBorder?: boolean;
    rowBorder?: boolean;
    striped?: boolean;
    highlightOnHover?: boolean;
    captionSide?: boolean;
    stickyHeader?: boolean;
}

const tableElement = (element: 'th' | 'td' | 'tr' | 'thead' | 'tbody' | 'tfoot' | 'caption', options?: TableElementProps) => {
    return React.forwardRef<HTMLElement, TableElementProps>((props, ref) => {
        const { className, style, children, ...restProps } = props;
        const ctx = useTableContext();

        console.log(ctx)

        return React.createElement(
            element,
            {
                ref,
                className: classNames(
                    styles[element],
                    options?.columnBorder && ctx.withColumnBorders && styles.withColumnBorders,
                    options?.rowBorder && ctx.withRowBorders && styles.withRowBorders,
                    options?.highlightOnHover && ctx.highlightOnHover && styles.highlightOnHover,
                    options?.captionSide && ctx.captionSide && styles[`caption-${ctx.captionSide}`],
                    options?.stickyHeader && ctx.stickyHeader && styles.stickyHeader,
                    className
                ),
                style,
                ...restProps,
            },
            children
        );
    });
};

export const TableTh = tableElement('th', { columnBorder: true });
export const TableTd = tableElement('td', { columnBorder: true });
export const TableTr = tableElement('tr', {
    rowBorder: true,
    striped: true,
    highlightOnHover: true,
});
export const TableThead = tableElement('thead', { stickyHeader: true });
export const TableTbody = tableElement('tbody');
export const TableTfoot = tableElement('tfoot');
export const TableCaption = tableElement('caption', { captionSide: true });