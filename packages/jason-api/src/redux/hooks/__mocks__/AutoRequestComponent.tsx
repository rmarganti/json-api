// External dependencies
import * as React from 'react';

// Internal dependencies
import { jasonApiRequest } from '../../actions';
import { useAutoRequest } from '../useAutoRequest';

// Testing dependencies
import { articleResponse } from '__mocks__/articleResponse';
import { ArticleResource } from '__mocks__/types';
import { mockAxios } from '__tests__/tools';

// Mock Action Creator
const mockAction = (articleId: string) =>
    jasonApiRequest<ArticleResource>({
        url: `/api/articles/${articleId}`,
    });

mockAxios.onGet('/api/articles/autoRequest').replyOnce(200, articleResponse);

const AutoRequestComponent: React.FunctionComponent = () => {
    const action = mockAction('autoRequest');
    const [request] = useAutoRequest({
        action,
        expandResourceObjects: true,
    });

    return request.response ? (
        <h1 id="title">{request.response.data.attributes.title}</h1>
    ) : null;
};

export default AutoRequestComponent;
