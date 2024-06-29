import React from 'react';

import { useIsomorphicEffect } from './useIsomorphicEffect';
import { randomId } from '../utils/randomId';

export function useId(staticId?: string) {
    const reactId = React.useId();
    const [uuid, setUuid] = React.useState(reactId);

    useIsomorphicEffect(() => {
        setUuid(randomId());
    }, []);

    if (typeof staticId === 'string') {
        return staticId;
    }

    if (typeof window === 'undefined') {
        return reactId;
    }

    return uuid;
}
