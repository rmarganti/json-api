// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { withItem, WithItemInjectedProps } from '../../../../src';

// Internal Dependencies
import { CommentResource } from '../../types';
import Author from './Author';

interface CommentProps extends WithItemInjectedProps<CommentResource> {
    id: string;
}

const Comment: React.SFC<CommentProps> = ({ data: comment }) =>
    comment ? (
        <Root>
            {comment.attributes.body.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
            ))}

            <Author id={comment.relationships.author.data.id} />
        </Root>
    ) : null;

const Root = styled.li`
    margin-bottom: 2em;
    margin-top: 2em;
    padding-bottom: 2em;
    border-bottom: 1px solid #ccc;
`;

export default withItem<CommentResource>({
    resourceType: 'comments',
})(Comment);
