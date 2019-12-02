// External dependencies
import * as React from 'react';

// Internal dependencies
import { mockAxios } from '__tests__/tools';
import { jasonApiRequest } from '../../actions';
import { useAutoRequest } from '../useAutoRequest';

// Mock Action Creator
const mockAction = (articleId: string) =>
    jasonApiRequest<typeof mockResponse>({
        url: `/api/articles/${articleId}`,
    });

// Mock the response (in non-JSON API format).
const mockResponse = { title: 'JSON API paints my bikeshed!' };
mockAxios.onGet('/api/articles/nonJsonApi').replyOnce(200, mockResponse);

const NonJsonApiAutoRequestComponent: React.FunctionComponent = () => {
    const action = mockAction('nonJsonApi');
    const [request] = useAutoRequest({
        action,
        expandResourceObjects: true,
    });

    return request.response ? (
        <h1 id="title">{request.response.title}</h1>
    ) : null;
};

export default NonJsonApiAutoRequestComponent;
