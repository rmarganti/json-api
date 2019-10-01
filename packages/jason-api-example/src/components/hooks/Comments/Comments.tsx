// External Dependencies
import * as React from 'react';
import styled from 'styled-components';
import { ResourceIdentifier } from 'ts-json-api';

// Internal Dependencies
import Button from '../../common/Button';
import Comment from '../Comment';
import { CommentResource } from '../../../types';

interface CommentsProps {
    comments: ResourceIdentifier<CommentResource>[];
    isLoading: boolean;
    onAddComment: () => void;
}

const Comments: React.SFC<CommentsProps> = ({
    comments,
    isLoading,
    onAddComment,
}) => (
    <Root>
        <h2>Comments</h2>

        <CommentList>
            {comments.map(comment => (
                <Comment key={comment.id} id={comment.id} />
            ))}
        </CommentList>

        <Button disabled={isLoading} onClick={onAddComment}>
            {isLoading ? 'Adding Comment…' : 'Add Comment'}
        </Button>
    </Root>
);

const Root = styled.div`
    margin-top: 2em;
    margin-bottom: 2em;
`;

const CommentList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none outside none;
`;

export default Comments;
