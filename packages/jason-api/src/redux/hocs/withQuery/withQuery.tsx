// External dependencies
import * as React from 'react';
import { ResourceObjectOrObjects } from 'ts-json-api';

// Internal dependencies
import { Subtract } from '../../../types/other';
import { JasonApiRequestAction } from '../../actions/jasonApiRequest';
import { useAutoRequest } from '../../hooks/useAutoRequest';
import { UseRequestOptions, UseRequestResult } from '../../hooks/useRequest';

type QueryFactory<Data extends ResourceObjectOrObjects> = (
    props: any
) => JasonApiRequestAction<Data>;

interface WithQueryOptions<R extends ResourceObjectOrObjects> {
    actionFactory: QueryFactory<R>;
    cacheScheme?: 'cacheFirst' | 'cacheOnly' | 'noCache';
    expandResourceObjects?: boolean;
    onError?: UseRequestOptions<R>['onError'];
    onSuccess?: UseRequestOptions<R>['onSuccess'];
    propsToWatch?: string[];
}

export type WithQueryInjectedProps<
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects
> = UseRequestResult<Data>;

export const withQuery = <
    Data extends ResourceObjectOrObjects = ResourceObjectOrObjects
>({
    actionFactory,
    cacheScheme = 'cacheFirst',
    expandResourceObjects = false,
    onError,
    onSuccess,
}: WithQueryOptions<Data>) => <
    OriginalProps extends WithQueryInjectedProps<Data>
>(
    BaseComponent: React.ComponentType<OriginalProps>
) => {
    type ExternalProps = Subtract<OriginalProps, WithQueryInjectedProps<Data>>;

    const WithQuery: React.FunctionComponent<ExternalProps> = externalProps => {
        const action = actionFactory(externalProps);

        const request = useAutoRequest<Data>({
            action,
            cacheScheme,
            expandResourceObjects,
            onSuccess,
            onError,
        });

        const passedProps = {
            ...externalProps,
            ...request,
        } as OriginalProps;

        return <BaseComponent {...passedProps} />;
    };

    return WithQuery;
};
