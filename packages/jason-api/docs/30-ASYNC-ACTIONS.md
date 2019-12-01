# Async Actions

The `JASON_API_FETCH` action triggers an api call. A basic get request only requires a url.

```js
import { JASON_API_FETCH } from 'jason-api';

const fetchBook = id => ({
    type: JSON_API_FETCH,
    url: `/api/books/${id}`,
});
```

There are plenty of other options, however, for customizing your requests with minimal code.

## Options

```js
{
    // Required
    type: JSON_API_FETCH,

    // Defaults to 'get'
    method: 'get'|'post'|'patch'|'delete',

    // API route to hit
    url: <STRING>,

    // Optional payload to json-encode and pass along
    payload: <OBJECT>,

    // Additional headers to send along with the network request
    additionalHeaders: <OBJECT>,

    // If included without entityId, `loading` & `error` meta data is set for this entity type
    entityType: <STRING>,

    // If included with entityType, `loading` & `error` meta data is set for this specific entity
    entityId: <STRING>,

    // Optional function to call on success
    onSuccess: <FUNCTION>,

    // Do not dispatch the startLoadingActionCreator, if one was set using the `jsonApiMiddlewareFactory`
    disableStartLoadingActionCreator: <BOOLEAN>,

    // Optional function or response-code mapped object of functions to call on error.
    onError: <FUNCTION|OBJECT>,

    // If set to true, `displayErrorActionCreator` that was set using the
    // `jsonApiMiddlewareFactory` will be dispatched in the event of an error.
    displayNotificationOnError: <BOOLEAN>,

    // Set a relationship or relationships on success. Accepts an ID or
    // Array of ID's. If relationshipId is not provided, it will use the
    // JSON response. Will completely replace existing relationship(s).
    setRelationshipOnSuccess: [entityType, entityId, relationshipType, relationshipId],

    // Add a relationship on success. Ideal for one-to-many/many-to-many
    // relationships. If relationshipId is not provided, it will use the
    // JSON response. New relationships are appended to existing ones.
    addRelationshipOnSuccess: [entityType, entityId, relationshipType, relationshipId],

    // Remove a relationship on success. Ideal for one-to-many relationships.
    removeRelationshipOnSuccess: [entityType, entityId, relationshipType, relationshipId],

    // Remove an entity from the store on success
    removeEntityOnSuccess: [entityType, entityId],

    // Update an entity on success. Note that any
    // JSON API response will automatically be applied.
    updateEntityOnSuccess: [entityType, entityId, payload],

    // Optional function to transform incoming server
    // response before it is processed by the middleware.
    // It should return a valid JSON API response.
    transformer: <FUNCTION>
}
```
