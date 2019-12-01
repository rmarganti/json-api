# Typescript

You love Typescript. We love typescript. JasonAPI loves typescript.

JasonAPI was built using [ts-json-api ](https://www.npmjs.com/package/ts-json-api).
It makes it very easy to ensure your JasonAPI components are type safe.

## withQuery

```ts
import { withQuery } from 'jason-api';
import * as React from 'react';
import { Relationship, ResourceObject, Response } from 'ts-json-api';

interface Article extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
    };
}

interface User extends ResourceObject {
    type: 'users';
    attributes: {
        email: string;
    };
    relationships: {
        articles: Relationship<Article[]>;
    };
}

type UserListProps = WithQueryInjectedProps<User[]> & SomeOtherPropsYouDefined;

const UserList: React.RFC<UserListProps> = (
    data,
    errors,
    isLoading,
    ...etc
) => (
    // Your implementation here
):

const EnhancedUserList = withQuery(
    // Your options.
)(UserList)
```
