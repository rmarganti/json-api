// External dependencies
import * as React from 'react';

// Internal dependencies
import { jasonApiRequest } from '../../../actions';
import {
    withAutoRequest,
    WithAutoRequestInjectedProps,
} from '../withAutoRequest';

// Testing dependencies
import { articleResponse } from '__mocks__/articleResponse';
import { ArticleResource } from '__mocks__/types';
import { mockAxios } from '__tests__/tools';

mockAxios
    .onGet('/api/articles/withAutoRequest')
    .replyOnce(200, articleResponse);

type WithAutoRequestComponentProps = WithAutoRequestInjectedProps<
    ArticleResource
>;

const WithAutoRequestComponent: React.FunctionComponent<WithAutoRequestComponentProps> = ({
    request,
}) => {
    const title =
        request.status === 'success'
            ? request.response.data.attributes.title
            : 'Loading…';

    return <h1>{title}</h1>;
};

export default withAutoRequest<ArticleResource>({
    actionFactory: () =>
        jasonApiRequest({
            url: '/api/articles/withAutoRequest',
        }),
})(WithAutoRequestComponent);
