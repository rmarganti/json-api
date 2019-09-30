![Logo](./imgs/header.png)

# JasonAPI

Consume and manipulate [JSON API standard](http://jsonapi.org/)
data in Redux with scary ease.

## Note

All the following examples are written in Typescript in order to demonstrate
how JasonAPI helps you write strictly-typed JSON API calls and responses.
Javascript specific examples are incoming.

## Hooking up the reducer and middleware

```ts
import {
    // JasonAPI expects its reducer to be named `jasonAPI`
    reducer as jasonApi,
    middleware as jasonApiMiddleware,
} from 'jason-api';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import * as yourReducers from './reducers';

const store = createStore(
    combineReducers({ ...yourReducers, jasonApi }),
    applyMiddleware(jasonApiMiddleware)
);
```

## A Basic (But Powerful) Example

Below is a simple example. Hopefully, it should demonstrate how the individual
pieces play together. With just a little bit of code, you get JSON API-compliant
api calls, caching, loading status management, error-handling, and efficient
React renders.

```tsx
import { ResourceObject } from 'ts-json-api';
import { jasonApiRequest, useAutoRequest, useItem } from 'jason-api';

/**
 * JasonAPI makes use of `ts-json-api` to maintain strict typing
 * across the board. Let your app know exactly what to expect.
 */
interface UserResource extends ResourceObject {
    type: 'users',
    attributes: {
        firstName: string;
        lastName: string;
    }
}

/**
 * A `jasonApiRequest()` is the primary building block of JasonAPI.
 * It lets the middleware keep track of requests and responses and allows
 * the rest of the library easily infer types.
 */
const fetchUsers = () =>
    jasonApiRequest<UserResource[]>({
        url: '/api/users',
    });

const UsersList = () => {
    // `useAutoRequest()` will automatically execute your action,
    // keep track of loading status, manage cache, and more!
    const { data, errors, isLoading } = useAutoRequest({
        action: fetchUsers()
    });

    if (isLoading) {
        <YourLoadingComponent />
    }

    if (error) {
        return <YourErrorsComponent errors={errors} />
    }

    return (
        <div>
            <h1>Users</h1>
            {data.map(user => <User id={user.id} />)}
        </div>
    );
}

interface UserProps {
    id: string;
}
const User: React.FunctionComponent<UserProps> = ({ id }) => {
    const user = useItem<UserResource>('users', id);

    return (
        <div>
            <h2>{user.attributes.userName}</h2>
            <h3>{user.attributes.email}</h3>
        </div>
    );
};
```

## Additional features

The above example demonstrates a fairly common use case. But there are
a lot more features and options to explore. Make sure to reference the docs.
Just a few additional features:

- **Higher Order Components** - If hooks aren't your thing, JasonAPI provides
  Higher Order Components with all the same features.
-