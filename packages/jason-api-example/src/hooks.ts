import { useState, useCallback } from 'react';

export const useToggle = (
    initialValue: boolean = false
): [boolean, () => void] => {
    const [state, setState] = useState(initialValue);
    const toggleState = useCallback(
        () => setState(currentState => !currentState),
        []
    );

    return [state, toggleState];
};
