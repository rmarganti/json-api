// External Dependencies
import * as React from 'react';
import { ResourceIdentifier, Response } from 'ts-json-api';

// JasonAPI
import { useRequest } from '../../../../../src';

// Internal Dependencies
import { addComment } from '../../../actions';
import { CommentResource } from '../../../types';
import Comments from './Comments';

type CommentIdentifier = ResourceIdentifier<CommentResource>;

interface CommentsProps {
    comments: CommentIdentifier[];
}

const CommentsContainer: React.SFC<CommentsProps> = ({ comments }) => {
    const [internalComments, setComments] = React.useState(comments);

    // Reset local state when props change (Similar to `mapPropsToState`).
    React.useEffect(() => {
        setComments(comments);
    }, [comments]);

    const addNewCommentToLocalState = React.useCallback(
        (response: Response<CommentResource>) => {
            setComments(currentComments => {
                if (!response.data) {
                    return currentComments;
                }

                const newComment: CommentIdentifier = {
                    type: 'comments',
                    id: response.data.id,
                };

                return [...currentComments, newComment];
            });
        },
        []
    );

    const doAddComment = useRequest({
        action: addComment(),
        onSuccess: addNewCommentToLocalState,
    });

    return (
        <Comments
            comments={internalComments}
            onAddComment={doAddComment.fetch}
            isLoading={doAddComment.isLoading}
        />
    );
};

export default CommentsContainer;
