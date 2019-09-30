// External dependencies
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';

// Internal dependencies
import { jasonApiRequest } from '../../../actions';
import { withQuery, WithQueryInjectedProps } from '../withQuery';

// Testing dependencies
import { articleResponse } from '__mocks__/articleResponse';
import { ArticleResource } from '__mocks__/types';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, articleResponse);

type WithQueryComponentProps = WithQueryInjectedProps<ArticleResource>;

const WithQueryComponent: React.FunctionComponent<WithQueryComponentProps> = ({
    data,
}) => (data && data.attributes ? <h1>{data.attributes.title}</h1> : null);

export default withQuery<ArticleResource>({
    actionFactory: () =>
        jasonApiRequest({
            url: '/api/article/1',
        }),
})(WithQueryComponent);
