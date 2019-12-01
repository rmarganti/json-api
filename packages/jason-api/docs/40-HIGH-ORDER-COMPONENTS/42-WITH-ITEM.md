# withItem()

Grab a previously fetched, single resource object from the JasonAPI redux store.
You can either explicity state the type and id of the resouce object you want
to grab, or you can pass in a simplified resource object via the `data` prop
to get the expanded resource object.

Your Component will receive your resource object in the `data` prop, similar
to `withQuery` above. However, you will not receive `isLoading`, etc., since
`withItem` does not trigger an async request.

```js
import { withItem } from 'jason-api';

const enhance = withItem({
    // Optional if using the `data` prop method.
    resourceType: 'users',

    // Optional if you want to use the `id` or `data` prop methods shown below.
    resourceId: '12345',
});

const EnhancedUser = enhance(YourUserComponent);

// If you included `resourceId` in your options.
<EnhancedUser />

// If you did not include `resourceId` in your options,
// or you want to overwrite it.
<EnhancedUser id="12345" />

// Useful for iterating over the simplified resource objects
// returned from a `withQuery` collection response.
<EnhancedUser data={{ type: 'users', id: '12345' }} />
```
