import React from 'react';
import styles from '../Card.module.scss';
import {classNames} from '@/shared/components';

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    withBorder?: boolean;
    inheritPadding?: boolean;
}

export const CardSection = React.forwardRef<HTMLDivElement, CardSectionProps>((props, ref) => {
    const {
        withBorder,
        inheritPadding,
        className,
        style,
        ...others
    } = props;

    const sectionClassNames = classNames(
        styles.section,
        {
            [styles.withBorder]: withBorder,
            [styles.inheritPadding]: inheritPadding,
        },
        className
    );

    return (
        <div
            ref={ref}
            className={sectionClassNames}
            style={style}
            {...others}
        />
    );
});

CardSection.displayName = 'CardSection';
