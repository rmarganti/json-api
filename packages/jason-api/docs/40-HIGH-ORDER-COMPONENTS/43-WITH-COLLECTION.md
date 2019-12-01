# withCollection()

## Basic Usage

```js
import { withCollection } from 'jason-api';
import { User } from './your-components';

const UserList = ({
    data,
    isLoading,
    refetch,
}: CollectionProps) => (
    <div onClick={onDummyAction}>
        <h1>
            User
            {isLoading && <span>Loading...</span>}
        </h1>

        {(data || []).map(user => (
            <User key={user.id} data={user} />
        ))}

        <button onClick={refetch}>Refresh</button>
    </div>
);

const EnhancedUserList = withCollection({ resourceType: 'users' })(UserList);

```

## Options

```js
const enhance = withCollection({
    resourceType: 'users',

    // Optional if you want to set it dynamically with
    // the `ids` prop on your enhanced Component.
    ids: ['12345', '54321'],

    // Unless set to `true`, your resource objects will be simplified
    // and returned with only the `type` and `id` props. You will get
    // more effecient React renders if you iterate over these and use
    // `withItem` to fetch the complete data on the item-level.
    expandResourceObjects: false,
});

const EnhancedUsers = enhance(Users);

// If you included `ids` in your options above, those will be returned.
// If not, all resource objects of the given type will be returned.
<EnhancedUsers />

// If you want to set id's dynamically.
<EnhancedUsers ids={['12345', '54321']} />
```
