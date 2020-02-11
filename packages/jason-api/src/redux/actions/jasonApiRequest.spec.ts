// External dependencies
import { Action, AnyAction } from 'redux';

// Testing dependencies
import { ArticleResource, PeopleResource } from '__mocks__';

// Internal dependencies
import { JasonApiDispatch, JasonApiState } from '../../types';
import { jasonApiRequest } from './jasonApiRequest';
import { Response } from 'ts-json-api';

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

        jasonApiRequest<ArticleResource, Dispatch, RootState>({
            url: '/articles',
            onSuccess: (response, { dispatch, getState }) => {
                console.log(response, dispatch, getState);
            },
        });
    });

    it('accepts a transformer', () => {
        // We expect the final shape to be a Response<PeopleResource>...
        jasonApiRequest<PeopleResource>({
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
