// External Dependencies
import * as React from 'react';
import styled from 'styled-components';

// JasonAPI
import { useAutoRequest } from 'jason-api';

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
    const [request, refetch] = useAutoRequest<ArticleResource>(
        {
            action: getArticle(id),
            expandResourceObjects: true,
        },
        [id]
    );

    const article = request.response && request.response.data;
    const isLoading = request.status === 'loading';

    // Scroll to top when a new Article is loaded.
    React.useLayoutEffect(() => {
        document.body.scrollTop = 0;
    }, [article]);

    return (
        <Root>
            {isLoading && !article ? (
                <Loading />
            ) : request.status === 'error' ? (
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

                    <Button disabled={isLoading} onClick={refetch}>
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
