// External Dependencies
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Testing Dependencies.
import { mockArticleResponse } from '../__mocks__/mockArticleResponse';
import { mockCommentResponse } from '../__mocks__/mockCommentResponse';

export const mockAxios = () => {
    // Mock the Axios (used under the hood) response
    const mock = new MockAdapter(axios, {
        delayResponse: 1000,
    });

    // Articles
    mock.onGet('/articles/1').reply(mockArticleResponse);
    mock.onPost('/articles').reply(mockArticleResponse);

    // Comments
    mock.onPost('/articles/1/relationships/comments').reply(
        mockCommentResponse
    );
};
