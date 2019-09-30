// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { WithItemInjectedProps, withItem } from '../../../../src';

// Internal Dependencies
import { PersonResource } from '../../types';

interface AuthorProps extends WithItemInjectedProps<PersonResource> {
    extraMargin?: boolean;
    id: string;
}

const Author: React.SFC<AuthorProps> = ({ data: author, extraMargin }) =>
    author ? (
        <Root extraMargin={extraMargin}>
            {author.attributes.firstName} {author.attributes.lastName}
        </Root>
    ) : null;

interface RootProps {
    extraMargin?: boolean;
}
const Root = styled.div<RootProps>`
    margin-bottom: ${props => (props.extraMargin ? '2em' : '0')};
    font-style: italic;
    opacity: 0.5;
`;

export default withItem<PersonResource>({
    resourceType: 'people',
})(Author);
