import React from 'react';

import { getInputOffsets } from './get-input-offsets/get-input-offsets';
import { useId } from '../../../core/hooks/useId';
import { factory } from '../../../core/lib/factory';
import { InputError } from '../InputError/InputError';
import { InputLabel } from '../InputLabel/InputLabel';
import { InputWrapperProvider } from '../InputWrapper.context';

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: React.ReactNode;
    error?: React.ReactNode;
    required?: boolean;
    labelProps?: Record<string, any>;
    errorProps?: Record<string, any>;
    inputWrapperOrder?: ('label' | 'input' | 'error')[];
}

export const InputWrapper = factory<'div', InputWrapperProps>(
    (
        {
            as: Component = 'div',
            label,
            labelProps,
            error,
            errorProps,
            required,
            inputWrapperOrder = ['label', 'input', 'error'],
            id,
            children,
            ...rest
        },
        ref,
    ) => {
        const idBase = useId();
        const inputId = idBase;
        const labelId = labelProps?.id || `${idBase}-label`;
        const hasError = !!error && typeof error !== 'boolean';
        const errorId = errorProps?.id || `${idBase}-error`;
        const isRequired = required;
        const _describedBy = `${hasError ? errorId : ''}`;
        const describedBy =
            _describedBy.trim().length > 0 ? _describedBy.trim() : undefined;

        const _input = <React.Fragment key="input">{children}</React.Fragment>;

        const _label = label && (
            <InputLabel
                key="label"
                id={labelId}
                htmlFor={inputId}
                required={isRequired}
                {...labelProps}
            >
                {label}
            </InputLabel>
        );

        const _error = error && (
            <InputError key="error" id={errorId} {...errorProps}>
                {error}
            </InputError>
        );

        const content = (inputWrapperOrder as (
            | 'label'
            | 'input'
            | 'error'
        )[])!.map((part) => {
            switch (part) {
                case 'label':
                    return _label;
                case 'input':
                    return _input;
                case 'error':
                    return _error;
                default:
                    return null;
            }
        });

        return (
            <InputWrapperProvider
                value={{
                    describedBy,
                    inputId,
                    labelId,
                    ...getInputOffsets(
                        (inputWrapperOrder as ('label' | 'input' | 'error')[])!,
                        { hasError },
                    ),
                }}
            >
                <Component {...rest} ref={ref}>
                    {content}
                </Component>
            </InputWrapperProvider>
        );
    },
);
