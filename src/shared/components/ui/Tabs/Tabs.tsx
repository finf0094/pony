import React from "react";
import {SizeType} from "../../types";
import {TabsProvider} from "./Tabs.context";
import {classNames, factory, getSafeId, useId, useUncontrolled} from "@/shared/components/core";

import styles from './Tabs.module.scss';

export type TabsVariant = 'default' | 'outline' | 'pills';
export type TabsColor = 'default' | 'primary' | 'success' | 'warning' | 'error';

export interface TabsCssVariables {
    '--tabs-color'?: string;
    '--tabs-radius'?: string;
}

export interface TabsProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
    defaultValue?: string | null;
    value?: string | null;
    onChange?: (value: string | null) => void;
    orientation?: 'vertical' | 'horizontal';
    placement?: 'left' | 'right';
    id?: string;
    variant: TabsVariant;
    color?: TabsColor;
    radius?: SizeType;
    keepMounted?: boolean;
}

const VALUE_ERROR =
    'Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value';

export const Tabs = factory<'div', TabsProps>((
    {
        as: Component = 'div',
        keepMounted = true,
        orientation = 'horizontal',
        placement = 'left',
        variant = 'default',
        color = 'default',
        radius = 'sm',
        id,
        value,
        defaultValue,
        onChange,
        children,
        ...rest
    }, ref
) => {
    const uid = useId(id);

    const [currentTab, setCurrentTab] = useUncontrolled({
        value,
        defaultValue,
        finalValue: null,
        onChange,
    });

    return (
        <TabsProvider value={{
            placement,
            value: currentTab,
            orientation,
            id: uid,
            getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
            getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
            onChange: setCurrentTab,
            variant,
            color,
            radius,
            keepMounted
        }}>
            <Component
                {...rest}
                ref={ref}
                id={uid}
                className={classNames(
                    styles.root,
                )}
            >
                {children}
            </Component>
        </TabsProvider>
    )
})