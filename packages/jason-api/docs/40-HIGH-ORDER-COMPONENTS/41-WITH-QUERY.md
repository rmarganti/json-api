# withQuery()
`withQuery` triggers and manages any Promise that resolves to a JSON API
response. With it, you get caching, loading status management, and error
handling. This HOC pairs well with `JASON_API_REQUEST` action creators.

```js
import { withQuery } from 'jason-api';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getUser, updateUser } from './yourActions';

const User = ({
    data,
    isLoading, // Automatically updated based on the status of your queryFactory's Promise
    refetch, // Re-run your queryFactory.
    ...anyOtherDataInAJsonApiResponse // `meta`, `errors`, etc.
}) =>
    isLoading ? (
        <p>Loading...</p>
    ) : (
        <div>
            <h1>{data.attributes.firstName} {data.attributes.lastName}</h1>
            <p>{data.attributes.email}</p>
        </div>
    );

const enhance = withQuery({
    queryFactory: (dispatch, props) => dispatch(getUser(props.id)),
    expandResourceObjects: true,
    propsToWatch: ['id'],
});

const EnhancedUser = enhance(User);
```

Now, you can use the `EnhancedUser` component wherever you may need them.
`<EnhancedUser id="12345" />`.

## Options

```js
const enhance = withQuery({
    // queryFactory is a function that returns a Promise
    // that resolves to a JSON API response. HINT: Any
    // dispatch()'ed JASON_API_REQUEST fits this criteria.
    queryFactory: (dispatch, props) => dispatch(getUser(props.id)),

    // Determines how caching is handled.
    // `cacheFirst` (default) ➡ Initially load the cached query,
    //     but still trigger the `queryFactory` for an updated.
    // `cacheOnly` ➡ If a cached version exists, use that without
    //     triggering the `queryFactory`.
    // `noCache` ➡ Never use the cached version, always trigger `queryFactory`.
    cacheScheme: 'cacheFirst',

    // Should full resource objects be provided to your component? Otherwise,
    // the resource objects will only contain a `type` and `id`. This useful for
    // optimizing React renders. Generally, you will want `true` for single-item
    // response and `false` for collection responses. Your individual collection
    // items can then be individually grabbed from the redux store using
    // `withItem()`. `false` by default.
    expandResourceObjects: true,

    // Any time any of the given props change,
    // the queryFactory will be retriggered.
    propsToWatch: ['id'],

    // By default, JasonAPI assumes its reducer is keyed by `resourceObjects`.
    // If you change it for some reason (we don't recommend you do), you can
    // let `withQuery` know to look for it a different key.
    stateBranch: 'resourceObjects',
});
```
