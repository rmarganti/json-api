// External dependencies
import * as React from 'react';

// Internal dependencies
import { jasonApiRequest } from '../../../actions';
import { withQuery, WithQueryInjectedProps } from '../withQuery';

// Testing dependencies
import { articleResponse } from '__mocks__/articleResponse';
import { ArticleResource } from '__mocks__/types';
import { mockAxios } from '__tests__/tools';

mockAxios.onGet('/api/articles/withQuery').replyOnce(200, articleResponse);

type WithQueryComponentProps = WithQueryInjectedProps<ArticleResource>;

const WithQueryComponent: React.FunctionComponent<WithQueryComponentProps> = ({
    request,
}) => {
    const title =
        request.status === 'success'
            ? request.response.data.attributes.title
            : 'Loading…';

    return <h1>{title}</h1>;
};

export default withQuery<ArticleResource>({
    actionFactory: () =>
        jasonApiRequest({
            url: '/api/articles/withQuery',
        }),
})(WithQueryComponent);
