// External Dependencies
import * as React from 'react';
import { connect } from 'react-redux';
import { ResourceIdentifier, Response } from 'ts-json-api';

// JasonAPI
import { JasonApiDispatch } from '../../../../../src';

// Internal Dependencies
import { addComment } from '../../../actions';
import { CommentResource } from '../../../types';
import Comments from './Comments';

type CommentIdentifier = ResourceIdentifier<CommentResource>;

interface CommentsProps {
    comments: CommentIdentifier[];
    doAddComment: () => Promise<Response<CommentResource>>;
}

interface CommentsState {
    internalComments: CommentIdentifier[];
    isLoading: boolean;
}

const defaultState: CommentsState = {
    internalComments: [],
    isLoading: false,
};

class CommentsContainer extends React.Component<CommentsProps, CommentsState> {
    state = defaultState;

    componentDidMount() {
        this.setState({
            internalComments: this.props.comments,
        });
    }

    componentDidUpdate(prevProps: CommentsProps) {
        if (prevProps.comments === this.props.comments) {
            return;
        }

        this.setState({
            internalComments: this.props.comments,
        });
    }

    onAddComment = () => {
        const { doAddComment } = this.props;

        this.setState({ isLoading: true });

        doAddComment().then(response => {
            if (!response.data) {
                // There was an error
                return;
            }

            const newComment: CommentIdentifier = {
                type: 'comments',
                id: response.data.id,
            };

            this.setState({
                internalComments: [...this.state.internalComments, newComment],
                isLoading: false,
            });
        });
    };

    render() {
        const { internalComments, isLoading } = this.state;

        return (
            <Comments
                comments={internalComments}
                onAddComment={this.onAddComment}
                isLoading={isLoading}
            />
        );
    }
}

export default connect(
    null,
    (dispatch: JasonApiDispatch) => ({
        doAddComment: () => dispatch(addComment()),
    })
)(CommentsContainer);
