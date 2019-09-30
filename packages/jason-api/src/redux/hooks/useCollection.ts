// External dependencies
import { useSelector } from 'react-redux';
import { ResourceObject } from 'ts-json-api';

// Internal dependencies
import { StateWithJasonApi } from '../../types/state';
import { getResourceObjects } from '../selectors';

export const useCollection = <T extends ResourceObject = ResourceObject>(
    resourceType: string,
    resourceIds?: string[],
    expandResourceObjects?: boolean
): T[] =>
    useSelector((state: StateWithJasonApi) =>
        getResourceObjects<T>(
            state,
            resourceType,
            resourceIds,
            expandResourceObjects
        )
    );
