// External dependencies
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';

// Internal dependencies
import { jasonApiRequest } from '../../actions';
import { useAutoRequest } from '../useAutoRequest';

// Testing dependencies
import { articleResponse } from '__mocks__/articleResponse';
import { ArticleResource } from '__mocks__/types';

// Mock Action Creator
const mockAction = (articleId: string) =>
    jasonApiRequest<ArticleResource>({
        url: `/api/article/${articleId}`,
    });

const mock = new MockAdapter(axios);
mock.onGet().reply(200, articleResponse);

const AutoRequestComponent: React.FunctionComponent = () => {
    const action = mockAction('1');
    const response = useAutoRequest({
        action,
        expandResourceObjects: true,
    });

    return response.data ? (
        <h1 id="title">{response.data.attributes.title}</h1>
    ) : null;
};

export default AutoRequestComponent;
