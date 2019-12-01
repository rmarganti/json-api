# Directly Accessing the Store

You may not want to use the HOC's, opting instead to locally stored data yourself. Below are a number of action creators and selectors that may be helpful.

## Consuming JSON data
```javascript
import { loadJsonApiResourceObjectData } from 'jason-api';

dispatch(loadJsonApiResourceObjectData(jsonApiResponseFromServer));
```

## Manipulating resource objects
```javascript
import {
    addRelationshipToResourceObject,
    removeRelationshipFromResourceObject,
    updateResourceObject
} from 'jason-api';

/**
 * dispatch(updateResourceObject('article', articleId, {
 *     isUserFavorite: true
 * }));
 */
updateResourceObject(resourceObjectKey, resourceObjectId, dataObject);

/**
 * dispatch(addRelationshipToResourceObject('article', '54321', 'readers', {
 *     type: 'user',
 *     id: '12345',
 *     attributes: { name: "Bob Ross" }
 * }));
 */
addRelationshipToResourceObject(
    resourceObjectKey,
    resourceObjectId,
    relationshipKey,
    relationshipJsonApiObject
);

/**
 * You can also add relationships by ID.
 * dispatch(addRelationshipToResourceObject(
 *     'article', '54321', 'readers', '12345'
 * ));
 */
addRelationshipToResourceObject(
    resourceObjectKey,
    resourceObjectId,
    relationshipKey,
    relationshipJsonApiObject
);

/**
 * dispatch(removeRelationshipFromResourceObject(
 *     'article', '54321', 'readers', '12345'
 * ));
 */
removeRelationshipFromResourceObject(
    resourceObjectKey,
    resourceObjectId,
    relationshipKey,
    relationshipId
);
```

## Retrieving resource objects from the store
```javascript
import { getResourceObject, getEntities } from 'jason-api';

// Get single article
const article = getResourceObject(state.resourceObjects, 'article', articleId);

// Get all articles
const articles = getEntities(state.resourceObjects, 'articles');

// Get array of articles
const articles = getEntities(
    state.resourceObjects,
    'articles',
    [id1, id2, id3]
);
```

## Removing resource objects from the store
```javascript
import { removeResourceObject, clearResourceObjectType } from 'jason-api';

// Remove a single resource object
dispatch(removeResourceObject('articles', '1'));

// Remove all resource objects from an resource object type
dispatch(clearResourceObjectType('articles'));
```

## Metadata
```javascript
import {
    updateEntitiesMeta,
    updateResourceObjectMeta,
    getEntitiesMeta,
    getResourceObjectMeta
} from 'jason-api';

// Set a metadata value for a resource object type
dispatch(updateEntitiesMeta('articles', 'isLoading', true));

// Get all metadata for an resource object type
const metadata = getEntitiesMeta(state.resourceObjects, 'articles');

// Get a specific metadata value for an resource object type
const isLoading = getEntitiesMeta(
    state.resourceObjects,
    'articles',
    'isLoading'
);

// Set a metadata value for a specific resource object
dispatch(updateResourceObjectMeta('articles', '123', 'isLoading', true));

// Get all metadata for a specific resource object
const metadata = getResourceObjectMeta(
    state.resourceObjects,
    'articles',
    '123'
);

// Get a specific metadata value for a specific resource object
const isLoading = getResourceObjectMeta(
    state.resourceObjects,
    'articles',
    '123',
    'isLoading'
);
```

## Helpers
```javascript
import { getId, getIds } from 'jason-api';

// Extract item ID from JSON API response
getId(jsonResponse);

// Extract collection ID's from JSON API response
getIds(jsonResponse);
```
