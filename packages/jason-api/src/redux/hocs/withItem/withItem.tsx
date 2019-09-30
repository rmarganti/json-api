import * as React from 'react';
import { ResourceObject, ResourceIdentifier } from 'ts-json-api';

import { Subtract } from '../../../types/other';
import { useItem } from '../../hooks';

interface WithItemOptions {
    resourceType?: string;
    resourceId?: string;
}

export interface WithItemOwnProps<Data extends ResourceObject> {
    data?: ResourceIdentifier<Data>;
    id?: string;
}

export interface WithItemInjectedProps<
    Data extends ResourceObject = ResourceObject
> {
    data: Data;
}

export const withItem = <Data extends ResourceObject = ResourceObject>({
    resourceType,
    resourceId,
}: WithItemOptions = {}) => <OriginalProps extends WithItemInjectedProps<Data>>(
    BaseComponent: React.ComponentType<OriginalProps>
) => {
    type ExternalProps = Subtract<OriginalProps, WithItemInjectedProps> &
        WithItemOwnProps<Data>;

    const WithItem: React.FunctionComponent<ExternalProps> = externalProps => {
        const { data, id, ...rest } = externalProps;

        const resolvedType = data ? data.type : resourceType;
        const resolvedId = data ? data.id : id || resourceId;

        const item = useItem<Data>(
            resolvedType || '__fallbackType',
            resolvedId || '__fallbackId'
        );

        const passedProps = {
            ...rest,
            data: item,
        } as OriginalProps;

        return <BaseComponent {...passedProps} />;
    };

    return WithItem;
};
