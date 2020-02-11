// External dependencies
import { pick, values } from 'ramda';
import * as React from 'react';

// Internal dependencies
import { CacheScheme, Subtract } from '../../../types/other';
import { JasonApiRequestAction } from '../../actions/jasonApiRequest';
import { useAutoRequest } from '../../hooks/useAutoRequest';
import { UseRequestOptions, UseRequestResult } from '../../hooks/useRequest';

type QueryFactory<Data = any> = (props: any) => JasonApiRequestAction<Data>;

interface WithAutoRequestOptions<Data = any> {
    actionFactory: QueryFactory<Data>;
    cacheScheme?: CacheScheme;
    expandResourceObjects?: boolean;
    onError?: UseRequestOptions<Data>['onError'];
    onSuccess?: UseRequestOptions<Data>['onSuccess'];
    propsToWatch?: string[];
}

export interface WithAutoRequestInjectedProps<Data = any> {
    request: UseRequestResult<Data>[0];
    refetch: UseRequestResult<Data>[1];
}

export const withAutoRequest = <Data extends any = any>({
    actionFactory,
    cacheScheme = 'cacheFirst',
    expandResourceObjects = false,
    onError,
    onSuccess,
    propsToWatch = [],
}: WithAutoRequestOptions<Data>) => <
    OriginalProps extends WithAutoRequestInjectedProps<Data>
>(
    BaseComponent: React.ComponentType<OriginalProps>
) => {
    type ExternalProps = Subtract<
        OriginalProps,
        WithAutoRequestInjectedProps<Data>
    >;

    const WithAutoRequest: React.FunctionComponent<ExternalProps> = externalProps => {
        const action = actionFactory(externalProps);
        const watchedPropValues = values(pick(propsToWatch, externalProps));

        const [request, refetch] = useAutoRequest<Data>(
            {
                action,
                cacheScheme,
                expandResourceObjects,
                onSuccess,
                onError,
            },
            watchedPropValues
        );

        const passedProps = {
            ...externalProps,
            request,
            refetch,
        } as OriginalProps;

        return <BaseComponent {...passedProps} />;
    };

    return WithAutoRequest;
};
