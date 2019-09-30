// External dependencies
import * as React from 'react';

// Internal dependencies
import { useCollection } from '../useCollection';

// Testing dependencies
import { CommentResource } from '__mocks__/types';

const CollectionComponent: React.FunctionComponent = () => {
    const collection = useCollection<CommentResource>('comments');

    return (
        <div>
            {collection.map(comment => (
                <p key={comment.id}>{comment.attributes.body}</p>
            ))}
        </div>
    );
};

export default CollectionComponent;
