import { combineReducers } from 'redux';

import { resourceObjects } from './resourceObjects';
import { queries } from './queries';

export const reducer = combineReducers({
    resourceObjects,
    queries,
});
