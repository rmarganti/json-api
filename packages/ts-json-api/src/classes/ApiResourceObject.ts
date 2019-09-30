import {
    append,
    identity,
    ifElse,
    lensPath,
    lensProp,
    omit,
    over,
    path,
    pipe,
    prop,
    propEq,
    propOr,
    reject,
    set
} from 'ramda';

import { Attributes, NewResourceObject, Relationships } from '../types';
import {
    convertToApiResourceObjectOrObjects,
    isDefined,
    mergeReverse
} from '../utils';

export class ApiResourceObject<
    D extends NewResourceObject = NewResourceObject
> {
    private data: D;

    constructor(resourceObject: D) {
        this.data = resourceObject;
        Object.freeze(this);
    }

    /**
     * Static helper to build a new ApiResourceObject
     *
     * @param resourceObject
     */
    static of<S extends NewResourceObject = NewResourceObject>(
        resourceObject: S
    ) {
        return new ApiResourceObject(resourceObject);
    }

    /**
     * Apply the supplied function to the internal data and
     * return a new ApiResourceObject containing the result.
     *
     * @param f A function that accepts a iResource object and returns another
     */
    map(f: (x: D) => D) {
        return ApiResourceObject.of(f(this.data));
    }

    /**
     * Build a new ResourceObject of the given type and attributes
     * (optionally providing and id)
     *
     * @param type
     * @param attributes
     * @param id
     */
    static build(type: string, attributes: Attributes, id?: string) {
        return new ApiResourceObject({
            type,
            id,
            attributes
        });
    }

    /**
     * Return the type
     */
    type() {
        return prop('type', this.data);
    }

    /**
     * Return the ID
     */
    id() {
        return prop('id', this.data);
    }

    /**
     * Return all Attributes
     */
    attributes() {
        return prop('attributes', this.data);
    }

    /**
     * Return a single Attribute value
     *
     * @param name
     */
    attribute(name: string) {
        return path(['attributes', name], this.data);
    }

    /**
     * Return all Relationships
     */
    relationships() {
        const relationships: Relationships = propOr(
            {},
            'relationships',
            this.data
        );

        return Object.keys(relationships).reduce(
            (carrier: object, name: string) => ({
                ...carrier,
                [name]: this.relationship(name)
            }),
            {}
        );
    }

    /**
     * Return a single Relationship value
     *
     * @param name
     */
    relationship(name: string) {
        return pipe(
            path(['relationships', name, 'data']),
            ifElse(
                isDefined,
                convertToApiResourceObjectOrObjects,
                () => undefined
            )
        )(this.data);
    }

    /**
     * Update the attributes of the ResourceObject
     *
     * @param payload
     */
    update(payload: Attributes = {}) {
        const updateAttributes = over(
            lensProp('attributes'),
            mergeReverse(payload)
        );

        return this.map(updateAttributes);
    }

    /**
     * Add a relationship to the ResourceObject by type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    addRelationship(
        relationship: string,
        typeOrResourceObject: string | ApiResourceObject,
        id?: string
    ) {
        const addRelationship = over(
            lensPath(['relationships', relationship, 'data']),
            append({
                type:
                    typeOrResourceObject instanceof ApiResourceObject
                        ? typeOrResourceObject.type()
                        : typeOrResourceObject,
                id:
                    typeOrResourceObject instanceof ApiResourceObject
                        ? typeOrResourceObject.id()
                        : id
            })
        );

        return this.map(addRelationship);
    }

    /**
     * Removes a relationship from the ResourceObject
     *
     * @param type
     * @param id
     */
    removeRelationship(type: string, id: string) {
        const hasGivenId = propEq('id', id);

        const removeRelationship = over(
            lensPath(['relationships', type, 'data']),
            reject(hasGivenId)
        );

        return this.map(removeRelationship);
    }

    /**
     * Set a to-one relationship to the given type and id
     *
     * @param relationship
     * @param typeOrResourceObject
     * @param id
     */
    setRelationship(
        relationship: string,
        typeOrResourceObject: string | ApiResourceObject,
        id?: string
    ) {
        const setRelationship = set(
            lensPath(['relationships', relationship, 'data']),
            {
                type:
                    typeOrResourceObject instanceof ApiResourceObject
                        ? typeOrResourceObject.type()
                        : typeOrResourceObject,
                id:
                    typeOrResourceObject instanceof ApiResourceObject
                        ? typeOrResourceObject.id()
                        : id
            }
        );

        return this.map(setRelationship);
    }

    /**
     * Returns the ResourceObject with the relationships stripped
     *
     * @return ResourceObject
     */
    withoutRelationships() {
        return ApiResourceObject.of(
            omit(['relationships'], this.data as NewResourceObject)
        );
    }

    /**
     * Output ResourceObject as a JSON-serializable object
     *
     * @param includeRelationships
     */
    toJSON(includeRelationships: boolean = false): D {
        return ifElse(
            () => includeRelationships,
            omit(['relationships']),
            identity
        )(this.data);
    }
}
