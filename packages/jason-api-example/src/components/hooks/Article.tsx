// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { useAutoRequest } from '../../../../src';

// Internal Dependencies
import { getArticle } from '../../actions';
import { ArticleResource } from '../../types';
import Button from '../common/Button';
import Loading from '../common/Loading';
import Comments from './Comments';
import Author from './Author';

interface ArticleProps {
    id: string;
}

const Article: React.FunctionComponent<ArticleProps> = ({ id }) => {
    const { data: article, errors, isLoading, fetch } = useAutoRequest<
        ArticleResource
    >(
        {
            action: getArticle(id),
            expandResourceObjects: true,
        },
        [id]
    );

    // Scroll to top when a new Article is loaded.
    React.useLayoutEffect(() => {
        document.body.scrollTop = 0;
    }, [article]);

    return (
        <Root>
            {!article && isLoading ? (
                <Loading />
            ) : errors ? (
                <div>Errors!</div>
            ) : article ? (
                <div>
                    <h1>
                        {article.attributes.title} {isLoading && <Loading />}
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

                    <Comments comments={article.relationships.comments.data} />

                    <Button disabled={isLoading} onClick={fetch}>
                        {isLoading ? 'Fetching new Article…' : 'Refetch'}
                    </Button>
                </div>
            ) : null}
        </Root>
    );
};

const Root = styled.div`
    max-width: 48rem;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 3em;
    font-family: sans-serif;
`;

export default Article;
