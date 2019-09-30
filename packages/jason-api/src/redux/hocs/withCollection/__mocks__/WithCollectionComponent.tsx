// External dependencies
import * as React from 'react';

// Internal dependencies
import { withCollection, WithCollectionInjectedProps } from '../withCollection';

// Testing dependencies
import { CommentResource } from '__mocks__/types';

type WithCollectionComponentProps = WithCollectionInjectedProps<
    CommentResource
>;

const WithCollectionComponent: React.FunctionComponent<
    WithCollectionComponentProps
> = ({ data }) =>
    data ? (
        <div>
            {data.map(comment => (
                <p key={comment.id}>{comment.attributes.body}</p>
            ))}
        </div>
    ) : null;

export default withCollection<CommentResource>({
    resourceType: 'comments',
})(WithCollectionComponent);
