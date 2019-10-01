// JasonAPI
import { jasonApiRequest } from '../../src';
import { ArticleResource, CommentResource } from './types';

// These create a JasonAPI meta action. They will trigger
// the middleware, which will make the API call, normalize
// the response, update the redux store with returned data,
// and fire various actions during that life cycle.
export const getArticle = (articleId: string) =>
    jasonApiRequest<ArticleResource>({
        url: `/articles/${articleId}`,
    });

export const createArticle = (title: string) =>
    jasonApiRequest<ArticleResource>({
        method: 'post',
        url: '/articles',
        payload: {
            data: {
                type: 'articles',
                attributes: {
                    title,
                },
            },
        },
    });

export const addComment = () =>
    jasonApiRequest<CommentResource>({
        method: 'post',
        url: '/articles/1/relationships/comments',
    });
