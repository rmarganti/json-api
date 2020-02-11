![Logo](./docs/imgs/header.png)

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
import * as React from 'react';
import { jasonApiRequest, useAutoRequest, useItem } from 'jason-api';
import { ResourceObject } from 'ts-json-api';

export interface ArticleResource extends ResourceObject {
    type: 'articles';
    attributes: {
        title: string;
        body: string;
    };
}

/**
 * A `jasonApiRequest()` is the primary building block of JasonAPI.
 * It lets the middleware keep track of requests and responses and allows
 * the rest of the library easily infer types.
 */
const fetchArticles = () =>
    jasonApiRequest<ArticleResource[]>({
        url: '/api/articles',
    });

// This component will automatically initiate a
// request to get a list of an Articles on mount.
export const ArticlesList = () => {
    const [request, refetch] = useAutoRequest({
        action: fetchArticles(),
    });

    switch (request.state) {
        case 'loading':
            return <YourLoadingComponent />;

        case 'error':
            return <YourErrorsComponent errors={request.response.errors} />;

        case 'success':
            return (
                <div>
                    <h1>Articles</h1>
                    {request.response.data.map(article => (
                        <Article id={article.id} />
                    ))}
                </div>
            );

        default:
            return null;
    }
};

interface ArticleProps {
    id: string;
}

// This component will grab available Article data from the reduce store.
const Article: React.FunctionComponent<ArticleProps> = ({ id }) => {
    const article = useItem<ArticleResource>('articles', id);

    if (!article) {
        return null;
    }

    return (
        <div>
            <h2>{article.attributes.title}</h2>
            <p>{article.attributes.body}</p>
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
