// External dependencies
import * as React from 'react';
import { ResourceObject } from 'ts-json-api';

// Internal dependencies
import { Subtract } from '../../../types/other';
import { useCollection } from '../../hooks';

interface WithCollectionOptions {
    resourceType: string;
    resourceIds?: string[];
}

export interface WithCollectionOwnProps {
    ids?: string[];
}

export interface WithCollectionInjectedProps<
    Data extends ResourceObject = ResourceObject
> {
    data: Data[];
}

export const withCollection = <Data extends ResourceObject = ResourceObject>({
    resourceType,
    resourceIds,
}: WithCollectionOptions) => <
    OriginalProps extends WithCollectionInjectedProps<Data>
>(
    BaseComponent: React.ComponentType<OriginalProps>
) => {
    type ExternalProps = Subtract<OriginalProps, WithCollectionInjectedProps> &
        WithCollectionOwnProps;

    const WithCollection: React.FunctionComponent<
        ExternalProps
    > = externalProps => {
        const { ids, ...rest } = externalProps;
        const resolvedIds = ids || resourceIds;

        const collection = useCollection<Data>(resourceType, resolvedIds) || [];

        const passedProps = {
            ...rest,
            data: collection,
        } as OriginalProps;

        return <BaseComponent {...passedProps} />;
    };

    return WithCollection;
};
