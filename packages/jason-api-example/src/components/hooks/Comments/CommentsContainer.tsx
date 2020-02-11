// External Dependencies
import * as React from 'react';
import { ResourceIdentifier, ResponseWithData } from 'ts-json-api';

// JasonAPI
import { useRequest } from 'jason-api';

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
    React.useLayoutEffect(() => {
        setComments(comments);
    }, [comments]);

    const addNewCommentToLocalState = React.useCallback(
        (response: ResponseWithData<CommentResource>) => {
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

    const [requestState, makeRequest] = useRequest({
        action: addComment(),
        onSuccess: response => {
            addNewCommentToLocalState(response);
        },
    });

    return (
        <Comments
            comments={internalComments}
            onAddComment={makeRequest}
            isLoading={requestState.status === 'loading'}
        />
    );
};

export default CommentsContainer;
