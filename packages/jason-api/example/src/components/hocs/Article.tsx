// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { withQuery, WithQueryInjectedProps } from '../../../../src';

// Internal Dependencies
import { getArticle } from '../../actions';
import { ArticleResource } from '../../types';
import Button from '../common/Button';
import Loading from '../common/Loading';
import Comments from './Comments';
import Author from './Author';

interface ArticleProps extends WithQueryInjectedProps<ArticleResource> {
    id: string;
}

class Article extends React.Component<ArticleProps> {
    componentDidUpdate(prevProps: ArticleProps) {
        // Scroll to top when a new Article is loaded.
        if (prevProps.data !== this.props.data) {
            document.body.scrollTop = 0;
        }
    }

    render() {
        const { data: article, errors, fetch, isLoading } = this.props;

        return (
            <Root>
                {!article && isLoading ? (
                    <Loading />
                ) : errors ? (
                    <div>Errors!</div>
                ) : article ? (
                    <div>
                        <h1>
                            {article.attributes.title}{' '}
                            {isLoading && <Loading />}
                        </h1>

                        <Author
                            id={article.relationships.author.data.id}
                            extraMargin
                        />

                        {article.attributes.body
                            .split('\n')
                            .map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}

                        <Comments
                            comments={article.relationships.comments.data}
                        />

                        <Button disabled={isLoading} onClick={fetch}>
                            {isLoading ? 'Fetching new Article…' : 'Refetch'}
                        </Button>
                    </div>
                ) : null}
            </Root>
        );
    }
}

const Root = styled.div`
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 3em;
    font-family: sans-serif;
`;

export default withQuery({
    actionFactory: (props: ArticleProps) => getArticle(props.id),
    expandResourceObjects: true,
    propsToWatch: ['id'],
})(Article);
