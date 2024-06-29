import { useState } from 'react';

interface UseUncontrolledInput<T> {
    /** Value for controlled state */
    value?: T;

    /** Initial value for uncontrolled state */
    defaultValue?: T;

    /** Final value for uncontrolled state when value and defaultValue are not provided */
    finalValue?: T;

    /** Controlled state onChange handler */
    // eslint-disable-next-line
    onChange?: (value: T, ...payload: any[]) => void;
}

export function useUncontrolled<T>({
    value,
    defaultValue,
    finalValue,
    onChange = () => {},
}: UseUncontrolledInput<T>): [
    T,
    // eslint-disable-next-line
    (value: T, ...payload: any[]) => void,
    boolean,
] {
    const [uncontrolledValue, setUncontrolledValue] = useState(
        defaultValue !== undefined ? defaultValue : finalValue,
    );

    // eslint-disable-next-line
    const handleUncontrolledChange = (val: T, ...payload: any[]) => {
        setUncontrolledValue(val);
        onChange?.(val, ...payload);
    };

    if (value !== undefined) {
        return [value as T, onChange, true];
    }

    return [uncontrolledValue as T, handleUncontrolledChange, false];
}
