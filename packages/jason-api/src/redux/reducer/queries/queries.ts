// External dependencies
import { lensPath, lensProp, over, pipe } from 'ramda';

// Internal dependencies
import { JasonApiAction } from '../../../types/redux';
import { QueriesState } from '../../../types/state';
import { cacheKeyForRequestAction } from '../../../utils/actions';
import {
    hashObject,
    reverseMergeDeepLeft,
    simplifyJsonApi,
} from '../../../utils/data';
import {
    REQUEST_SUCCESS,
    REQUEST,
    REQUEST_ERROR,
} from '../../actions/actionTypes';

export const queries = (state: QueriesState = {}, action?: JasonApiAction) => {
    if (!action) {
        return state;
    }

    switch (action.type) {
        case REQUEST: {
            const cacheKey = cacheKeyForRequestAction(action.payload);

            return over(
                lensPath([cacheKey, 'meta']),
                reverseMergeDeepLeft({ isLoading: true, error: null }),
                state
            );
        }

        case REQUEST_SUCCESS: {
            const { response } = action.payload;
            const cacheKey = cacheKeyForRequestAction(
                action.payload.requestConfig
            );

            return pipe(
                over(
                    lensProp(cacheKey),
                    reverseMergeDeepLeft(simplifyJsonApi(response))
                ),
                over(
                    lensPath([cacheKey, 'meta']),
                    reverseMergeDeepLeft({ isLoading: false, error: null })
                )
            )(state);
        }

        case REQUEST_ERROR: {
            const { requestConfig, response } = action.payload;
            const cacheKey =
                requestConfig.cacheKey || hashObject(requestConfig);

            return pipe(
                over(
                    lensProp(cacheKey),
                    reverseMergeDeepLeft(simplifyJsonApi(response))
                ),
                over(
                    lensPath([cacheKey, 'meta']),
                    reverseMergeDeepLeft({ isLoading: false })
                )
            )(state);
        }

        default:
            return state;
    }
};
