import React, {CSSProperties} from 'react';
import {TableContextValue, TableProvider} from './Table.context';
import {SizeType} from "@/shared/components/types";
import {classNames} from '../../core/lib/classNames';
import styles from './Table.module.scss';
import {TableCaption, TableTbody, TableTd, TableTfoot, TableTh, TableThead, TableTr} from './Table.components';

type TableBackgroundColor = 'transparent' | 'white';

interface TableCssVariables extends CSSProperties {
    '--table-vertical-spacing'?: string;
    '--table-horizontal-spacing'?: string;
    '--table-border-radius'?: string;
    '--table-background-color'?: TableBackgroundColor;
    '--table-sticky-header-offset'? :string | number;
}

export interface TableProps extends TableContextValue, React.HTMLAttributes<HTMLTableElement> {
    withTableBorder?: boolean;
    verticalSpacing?: SizeType;
    horizontalSpacing?: SizeType;
    borderRadius?: SizeType;
    backgroundColor?: TableBackgroundColor;
    stickyHeaderOffset?: number | string;
}

export const Table: React.FC<TableProps> & {
    Td: typeof TableTd;
    Th: typeof TableTh;
    Tr: typeof TableTr;
    Thead: typeof TableThead;
    Tbody: typeof TableTbody;
    Tfoot: typeof TableTfoot;
    Caption: typeof TableCaption;
} = ({
         withTableBorder,
         withColumnBorders,
         withRowBorders,
         verticalSpacing = 'xs',
         horizontalSpacing = 'xs',
         borderRadius,
         backgroundColor = 'transparent',
         highlightOnHover,
         captionSide,
         stickyHeader,
         stickyHeaderOffset,
         className,
         style,
         children,
         ...restProps
     }) => {
    const contextValue: TableContextValue = {
        withColumnBorders,
        withRowBorders,
        highlightOnHover,
        captionSide,
        stickyHeader,
    };

    const tableCssVars: TableCssVariables = {
        ...style,
        '--table-vertical-spacing': `var(--spacing-${verticalSpacing})`,
        '--table-horizontal-spacing': `var(--spacing-${horizontalSpacing})`,
        '--table-border-radius': `var(--radius-${borderRadius})`,
        '--table-background-color': backgroundColor,
        '--table-sticky-header-offset': stickyHeader ? stickyHeaderOffset : undefined,
    };

    return (
        <TableProvider value={contextValue}>
            <table
                className={classNames(
                    styles.table,
                    withTableBorder && styles.withTableBorder,
                    withColumnBorders && styles.withColumnBorders,
                    withRowBorders && styles.withRowBorders,
                    highlightOnHover && styles.highlightOnHover,
                    stickyHeader && styles.stickyHeader,
                    className
                )}
                style={tableCssVars}
                {...restProps}
            >
                {children}
            </table>
        </TableProvider>
    );
};

Table.Td = TableTd;
Table.Th = TableTh;
Table.Tr = TableTr;
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;