import * as actionTypes from './actionTypes';
import * as actions from './actions';

describe('actions', () => {
    it('should create an action to load json api data', () => {
        const payload = {
            data: {
                type: 'articles',
                id: '12345',
                attributes: {
                    title: 'Test Title',
                },
            },
        };
        const expectedAction = {
            type: actionTypes.LOAD_DATA,
            payload: payload,
        };
        expect(actions.loadJsonApiResourceObjectData(payload)).toEqual(
            expectedAction
        );
    });

    it('should create an action to add a relationship to an entity', () => {
        const resourceType = 'articles';
        const resourceId = '1';
        const relationshipKey = 'reader';
        const relationshipObject = {
            type: 'user',
            id: '54321',
            attributes: {
                name: 'Bob Ross',
            },
        };
        const expectedAction = {
            type: actionTypes.ADD_RELATIONSHIP,
            payload: {
                resourceType,
                resourceId,
                relationshipKey,
                relationshipObject,
            },
        };
        expect(
            actions.addRelationshipToResourceObject(
                resourceType,
                resourceId,
                relationshipKey,
                relationshipObject
            )
        ).toEqual(expectedAction);
    });

    it('should create an action to remove a relationship from an entity', () => {
        const resourceType = 'articles';
        const resourceId = '1';
        const relationshipKey = 'reader';
        const relationshipId = '54321';
        const expectedAction = {
            type: actionTypes.REMOVE_RELATIONSHIP,
            payload: {
                resourceType,
                resourceId,
                relationshipKey,
                relationshipId,
            },
        };

        expect(
            actions.removeRelationshipFromResourceObject(
                resourceType,
                resourceId,
                relationshipKey,
                relationshipId
            )
        ).toEqual(expectedAction);
    });

    it('should create an action to update an entity', () => {
        const resourceType = 'articles';
        const resourceId = '1';
        const data = {
            title: 'New Test Title',
        };
        const expectedAction = {
            type: actionTypes.UPDATE_RESOURCE_OBJECT,
            payload: {
                resourceType,
                resourceId,
                data,
            },
        };
        expect(
            actions.updateResourceObject(resourceType, resourceId, data)
        ).toEqual(expectedAction);
    });

    it('should create an action to update metadata for an entity group', () => {
        const resourceType = 'articles';
        const metaKey = 'isLoading';
        const value = true;

        const expectedAction = {
            type: actionTypes.UPDATE_RESOURCE_OBJECTS_META,
            payload: {
                resourceType,
                metaKey,
                value,
            },
        };

        expect(
            actions.updateResourceObjectsMeta(resourceType, metaKey, value)
        ).toEqual(expectedAction);
    });

    it('should create an action to update metadata for an entity', () => {
        const resourceType = 'articles',
            resourceId = '1',
            metaKey = 'isLoading',
            value = true;

        const expectedAction = {
            type: actionTypes.UPDATE_RESOURCE_OBJECT_META,
            payload: {
                resourceType,
                resourceId,
                metaKey,
                value,
            },
        };

        expect(
            actions.updateResourceObjectMeta(
                resourceType,
                resourceId,
                metaKey,
                value
            )
        ).toEqual(expectedAction);
    });

    it('should create an action to delete an entity', () => {
        const resourceType = 'articles';
        const resourceId = '1';

        const expectedAction = {
            type: actionTypes.REMOVE_RESOURCE_OBJECT,
            payload: {
                resourceType,
                resourceId,
            },
        };

        expect(actions.removeResourceObject(resourceType, resourceId)).toEqual(
            expectedAction
        );
    });

    it('should create an action to delete an entity type', () => {
        const resourceType = 'articles';

        const expectedAction = {
            type: actionTypes.CLEAR_RESOURCE_OBJECT_TYPE,
            payload: {
                resourceType,
            },
        };

        expect(actions.clearResourceObjectType(resourceType)).toEqual(
            expectedAction
        );
    });
});
