// External dependencies
import * as React from 'react';

// Internal dependencies
import { CommentResource } from '__mocks__/types';
import { useItem } from '../useItem';

interface ItemComponentProps {
    id: string;
}

const ItemComponent: React.FunctionComponent<ItemComponentProps> = ({ id }) => {
    const item = useItem<CommentResource>('comments', id);

    return item ? <p>{item.attributes.body}</p> : null;
};

export default ItemComponent;
