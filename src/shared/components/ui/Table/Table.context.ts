import { createSafeContext } from '../../core/lib/create-safe-context';

export interface TableContextValue {
    withColumnBorders?: boolean;
    withRowBorders?: boolean;
    highlightOnHover?: boolean;
    captionSide?: 'top' | 'bottom';
    stickyHeader?: boolean;
}

const TABLE_CONTEXT_ERROR_MESSAGE = 'Table context is not available. Ensure that you are using Table components within a TableProvider.';

export const [TableProvider, useTableContext] = createSafeContext<TableContextValue>(TABLE_CONTEXT_ERROR_MESSAGE);
