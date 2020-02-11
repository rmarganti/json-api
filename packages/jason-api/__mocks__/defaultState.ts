import { JasonApiState } from '../src/types';

export const defaultState: JasonApiState = {
    resourceObjects: {
        articles: {
            meta: {
                anotherMetaProperty: 666,
                isLoading: true,
            },
            byId: {
                '1': {
                    id: '1',
                    type: 'articles',
                    attributes: {
                        title: 'JSON API paints my bikeshed!',
                    },
                    relationships: {
                        author: {
                            data: {
                                type: 'people',
                                id: '9',
                            },
                        },
                        comments: {
                            data: [
                                {
                                    type: 'people',
                                    id: '5',
                                },
                                {
                                    type: 'people',
                                    id: '12',
                                },
                            ],
                        },
                    },
                    meta: {
                        isLoading: true,
                    },
                },
            },
        },
        people: {
            byId: {
                '9': {
                    type: 'people',
                    id: '9',
                    attributes: {
                        firstName: 'Dan',
                        lastName: 'Gebhardt',
                        twitter: 'dgeb',
                    },
                },
            },
            meta: {},
        },
        comments: {
            meta: {
                current: ['5', '12'],
            },
            byId: {
                '5': {
                    type: 'comments',
                    id: '5',
                    attributes: {
                        body: 'First!',
                    },
                    relationships: {
                        author: {
                            data: {
                                type: 'people',
                                id: '2',
                            },
                        },
                    },
                    meta: {
                        error: null,
                        isLoading: true,
                    },
                },
                '12': {
                    type: 'comments',
                    id: '12',
                    attributes: {
                        body: 'I like XML better',
                    },
                    relationships: {
                        author: {
                            data: {
                                type: 'people',
                                id: '9',
                            },
                        },
                    },
                    meta: {
                        error: null,
                        isLoading: false,
                    },
                },
            },
        },
    },
    queries: {
        cacheKey: {
            data: [
                {
                    id: '1',
                    type: 'articles',
                },
            ],
            links: {
                last: 'http://example.com/articles?page[offset]=10',
                next: 'http://example.com/articles?page[offset]=2',
                self: 'http://example.com/articles',
            },
        },
    },
};
