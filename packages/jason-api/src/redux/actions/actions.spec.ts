// External dependencies
import { Action, AnyAction } from 'redux';
import { Response } from 'ts-json-api';

// Testing dependencies
import { ArticleResource, PeopleResource } from '__mocks__';

// Internal dependencies
import { JasonApiDispatch, JasonApiState } from '../../types';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

describe('actions', () => {
    describe('jasonApiRequest()', () => {
        it('accepts extended State and Dispatch', () => {
            // ThunkAction and ThunkDispatch are taken straight from `redux-thunk`
            type ThunkAction<R, S, E, A extends Action> = (
                dispatch: ThunkDispatch<S, E, A>,
                getState: () => S,
                extraArgument: E
            ) => R;

            interface ThunkDispatch<S, E, A extends Action> {
                <T extends A>(action: T): T;
                <R>(asyncAction: ThunkAction<R, S, E, A>): R;
            }

            // Example Root State
            interface RootState {
                anything: string[];
                jasonApi: JasonApiState;
            }

            // Example App Dispatch
            type Dispatch = ThunkDispatch<RootState, undefined, AnyAction> &
                JasonApiDispatch;

            actions.jasonApiRequest<ArticleResource, Dispatch, RootState>({
                url: '/articles',
                onSuccess: (response, { dispatch, getState }) => {
                    console.log(response, dispatch, getState);
                },
            });
        });

        it('accepts a transformer', () => {
            // We expect the final shape to be a Response<PeopleResource>...
            actions.jasonApiRequest<PeopleResource>({
                url: '/articles',
                // ...but we expect the API response to be a Response<ArticleResource>.
                transformer: (response: Response<ArticleResource>) => {
                    return {
                        data: {
                            type: 'people',
                            id: (response.data && response.data.id) || '4444',
                            attributes: {
                                firstName: 'Bob',
                                lastName: 'Vila',
                                twitter: '@bob',
                            },
                        },
                    };
                },
            });
        });
    });
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
