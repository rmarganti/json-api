// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { useItem } from '../../../../src';

// Internal Dependencies
import { CommentResource } from '../../types';
import Author from './Author';

interface CommentProps {
    id: string;
}

const Comment: React.SFC<CommentProps> = ({ id }) => {
    const comment = useItem<CommentResource>('comments', id);

    if (!comment) {
        return null;
    }

    return (
        <Root>
            {comment.attributes.body.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
            ))}

            <Author id={comment.relationships.author.data.id} />
        </Root>
    );
};

const Root = styled.li`
    margin-bottom: 2em;
    margin-top: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #ccc;
`;

export default Comment;
