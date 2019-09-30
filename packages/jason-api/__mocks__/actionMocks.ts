import { AnyAction } from 'redux';

import * as actions from '../src/redux/actions/actions';
import * as actionTypes from '../src/redux/actions/actionTypes';
import { FlexiblePayload } from '../src/types/other';

/**
 * Generate action(s) for setting initial loading states
 *
 * @param   resourceType
 * @param   resourceId
 */
export const startLoading = (
    resourceType: string,
    resourceId?: string
): AnyAction[] => {
    const returnedActions = [{ type: 'START_LOADING' }];

    if (resourceId) {
        returnedActions.push.apply(returnedActions, [
            actions.updateResourceObjectMeta(
                resourceType,
                resourceId,
                'isLoading',
                true
            ),

            actions.updateResourceObjectMeta(
                resourceType,
                resourceId,
                'errors',
                null
            ),
        ]);
    } else if (resourceType) {
        returnedActions.push.apply(returnedActions, [
            actions.updateResourceObjectsMeta(resourceType, 'isLoading', true),
            actions.updateResourceObjectsMeta(resourceType, 'errors', null),
        ]);
    }

    return returnedActions;
};

/**
 * Generate action(s) for setting loading states to false
 *
 * @param   resourceType
 * @param   resourceId
 */
export const stopLoading = (
    resourceType: string,
    resourceId?: string
): AnyAction[] => {
    const returnedActions = [{ type: 'STOP_LOADING' }];

    if (resourceId) {
        returnedActions.push(
            actions.updateResourceObjectMeta(
                resourceType,
                resourceId,
                'isLoading',
                false
            )
        );
    } else if (resourceType) {
        returnedActions.push(
            actions.updateResourceObjectsMeta(resourceType, 'isLoading', false)
        );
    }

    return returnedActions;
};

/**
 * Generate action(s) for setting loading states to true then false
 *
 * @param  resourceType
 * @param  resourceId
 */
export const startAndStopLoading = (
    resourceType: string,
    resourceId?: string
) => [
    ...startLoading(resourceType, resourceId),
    ...stopLoading(resourceType, resourceId),
];

/**
 * Generate a LOAD_DATA action
 *
 * @param  response
 */
export const loadResponse = (response: string): AnyAction[] => [
    { type: actionTypes.LOAD_DATA, payload: response },
];

/**
 * Generate an action to add a relationship
 *
 * @param resourceType
 * @param resourceId
 * @param relationshipKey
 * @param response
 */
export const addRelationship = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    response: FlexiblePayload
) =>
    actions.addRelationshipToResourceObject(
        resourceType,
        resourceId,
        relationshipKey,
        response
    );

/**
 * Generate an action to remove a relationship
 *
 * @param  resourceType
 * @param  resourceId
 * @param  relationshipKey
 * @param  response
 */
export const removeRelationship = (
    resourceType: string,
    resourceId: string,
    relationshipKey: string,
    relationshipId: string
) =>
    actions.removeRelationshipFromResourceObject(
        resourceType,
        resourceId,
        relationshipKey,
        relationshipId
    );

/**
 * Generate an action to remove a Resource Object from the store
 * @param resourceType
 * @param resourceId
 */
export const removeResourceObject = (
    resourceType: string,
    resourceId: string
) => actions.removeResourceObject(resourceType, resourceId);
