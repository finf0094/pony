import React from 'react';
import { Merge } from 'type-fest';

type PropsOf<
    T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<T, React.ComponentProps<T>>;

type RefTypeOf<T extends React.ElementType> = React.Ref<
    React.ComponentPropsWithRef<T>['ref']
>;

type PolymorphicProps<C extends React.ElementType, Props = {}> = Merge<
    PropsOf<C>,
    Props
> & {
    as?: C;
    ref?: RefTypeOf<C>;
};

interface PolymorphismComponentWithRef<
    DefaultType extends React.ElementType,
    Props = {},
> {
    <C extends React.ElementType = DefaultType>(
        props: PolymorphicProps<C, Props>,
        ref: RefTypeOf<C>,
    ): React.ReactElement | null;

    displayName?: string | undefined;
}

export function factory<DefaultType extends React.ElementType, Props = {}>(
    baseComponent: PolymorphismComponentWithRef<DefaultType, Props>,
) {
    const WrappedComponent = React.forwardRef(
        baseComponent,
    ) as React.ForwardRefExoticComponent<
        React.PropsWithoutRef<PolymorphicProps<DefaultType, Props>> &
            React.RefAttributes<DefaultType>
    >;

    return WrappedComponent;
}
