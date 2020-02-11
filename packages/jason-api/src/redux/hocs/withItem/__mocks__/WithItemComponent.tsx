// External dependencies
import * as React from 'react';

// Internal dependencies
import { withItem, WithItemInjectedProps } from '../withItem';

// Testing dependencies
import { ArticleResource } from '__mocks__/types';

type WithItemComponentProps = WithItemInjectedProps<ArticleResource>;

const WithItemComponent: React.FunctionComponent<WithItemComponentProps> = ({
    data,
}) => (data && data.attributes ? <h1>{data.attributes.title}</h1> : null);

export default withItem<ArticleResource>({
    resourceType: 'articles',
    resourceId: '1',
})(WithItemComponent);
