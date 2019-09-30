// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { useItem } from '../../../../src';

// Internal Dependencies
import { PersonResource } from '../../types';

interface AuthorProps {
    extraMargin?: boolean;
    id: string;
}

const Author: React.SFC<AuthorProps> = ({ extraMargin, id }) => {
    const author = useItem<PersonResource>('people', id);

    if (!author) {
        return null;
    }

    return (
        <Root extraMargin={extraMargin}>
            {author.attributes.firstName} {author.attributes.lastName}
        </Root>
    );
};

interface RootProps {
    extraMargin?: boolean;
}
const Root = styled.div<RootProps>`
    margin-bottom: ${props => (props.extraMargin ? '2em' : '0')};
    font-style: italic;
    opacity: 0.5;
`;

export default Author;
