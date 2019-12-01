# Combining with `connect()` and other HOC's

At some point, you will probably want combine JasonAPI with `connect()` or another HOC. Doing so is easy. You can combine multiple HOC's with the `compose()` function. JasonAPI even plays well with [recompose](https://github.com/acdlite/recompose).


```js
import { compose, withQuery } from 'jason-api';
import { connect } from 'react-redux';

import { fetchUsers } from 'actions/users';
import { displayInfo } from 'actions/notifications';
import UserList from './UserList';

export default compose(
    connect(
        null,
        dispatch => ({
            onClickUser: () => dispatch(displayInfo('You clicked a user!')),
        })
    ),
    withQuery({
        queryFactory: dispatch => dispatch(fetchTacoLovers()),
    })
)(UserList);

```
