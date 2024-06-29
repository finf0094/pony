import {factory} from "@/shared/components/core/lib/factory";
import {useTabsContext} from "../Tabs.context";
import {TabsColor} from "../Tabs";

import styles from '../Tabs.module.scss';

interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
    value: string;
    children?: React.ReactNode;
    rightSection?: React.ReactNode;
    leftSection?: React.ReactNode;
    color: TabsColor;
}

export const Tab = factory<'button', TabProps>((
    {
        as: Component = 'button',
        rightSection,
        leftSection,
        value,
        children,
        onClick,
        ...rest
    }, ref) => {

    const ctx = useTabsContext();
    const active = value === ctx.value;
    const activateTab = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ctx.onChange(value);
        onClick?.(event);
    };

    return (
        <Component
            {...rest}
            ref={ref}
            role="tab"
            id={ctx.getTabId(value)}
            aria-selected={active}
            tabIndex={active || ctx.value === null ? 0 : -1}
            aria-controls={ctx.getPanelId(value)}
            onClick={activateTab}
        >
            {leftSection && (
                <span className={styles.tabLeftSection}>
                    {leftSection}
                </span>
            )}
            {children && <span className={styles.tabLabel}>{children}</span>}
            {rightSection && (
                <span className={styles.tabRightSection}>
                    {rightSection}
                </span>
            )}
        </Component>
    )
})