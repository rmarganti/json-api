import { useRef, DependencyList } from 'react';
import { equals } from 'ramda';

export const deepDependencyCheck = (value: DependencyList): DependencyList => {
    // eslint-disable-next-line
    const ref = useRef<DependencyList>();

    if (!equals(value, ref.current)) {
        ref.current = value;
    }

    return ref.current!;
};
