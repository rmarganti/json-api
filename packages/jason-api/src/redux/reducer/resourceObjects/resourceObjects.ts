// Internal dependencies
import { JasonApiAction } from '../../../types/redux';
import { ResourceObjectsState } from '../../../types/state';
import * as actionTypes from '../../actions/actionTypes';
import {
    addRelationshipToResourceObject,
    clearRelationshipOnResourceObject,
    clearResourceObjectType,
    insertOrUpdateResourceObjects,
    removeRelationshipFromResourceObject,
    removeResourceObject,
    setRelationshipOnResourceObject,
    updateResourceObject,
    updateResourceObjectMeta,
    updateResourceObjectsMeta,
} from '../state-transformer';

export const resourceObjects = (
    state: ResourceObjectsState = {},
    action?: JasonApiAction
) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case actionTypes.REQUEST_SUCCESS:
            return insertOrUpdateResourceObjects(action.payload.response)(
                state
            );

        case actionTypes.LOAD_DATA:
            return insertOrUpdateResourceObjects(action.payload)(state);

        case actionTypes.ADD_RELATIONSHIP:
            return addRelationshipToResourceObject(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.relationshipKey,
                action.payload.relationshipObject
            )(state);

        case actionTypes.REMOVE_RELATIONSHIP:
            return removeRelationshipFromResourceObject(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.relationshipKey,
                action.payload.relationshipId
            )(state);

        case actionTypes.SET_RELATIONSHIP:
            return setRelationshipOnResourceObject(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.relationshipKey,
                action.payload.relationshipObject
            )(state);

        case actionTypes.CLEAR_RELATIONSHIP:
            return clearRelationshipOnResourceObject(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.relationshipKey
            )(state);

        case actionTypes.UPDATE_RESOURCE_OBJECTS_META:
            return updateResourceObjectsMeta(
                action.payload.resourceType,
                action.payload.metaKey,
                action.payload.value
            )(state);

        case actionTypes.UPDATE_RESOURCE_OBJECT_META:
            return updateResourceObjectMeta(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.metaKey,
                action.payload.value
            )(state);

        case actionTypes.UPDATE_RESOURCE_OBJECT:
            return updateResourceObject(
                action.payload.resourceType,
                action.payload.resourceId,
                action.payload.data
            )(state);

        case actionTypes.REMOVE_RESOURCE_OBJECT:
            return removeResourceObject(
                action.payload.resourceType,
                action.payload.resourceId
            )(state);

        case actionTypes.CLEAR_RESOURCE_OBJECT_TYPE:
            return clearResourceObjectType(action.payload.resourceType)(state);

        default:
            return state;
    }
};
