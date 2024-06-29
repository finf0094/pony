import { createSafeContext } from '../../core/lib/create-safe-context';

export interface TabsContextValue {
    id: string;
    value: string | null;
    orientation: 'horizontal' | 'vertical' | undefined;
    onChange: (value: string | null) => void;
    getTabId: (value: string) => string;
    getPanelId: (value: string) => string;
    variant: string | undefined;
    color: string | undefined;
    radius: string | number | undefined;
    keepMounted: boolean | undefined;
    placement: 'right' | 'left' | undefined;
}

export const [TabsProvider, useTabsContext] = createSafeContext<TabsContextValue>(
    'Tabs component was not found in the tree'
);