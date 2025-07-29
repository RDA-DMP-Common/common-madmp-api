export * from '../models/AuthenticationRequiredError';
export * from '../models/BadRequestError';
export * from '../models/Booleanish';
export * from '../models/Certification';
export * from '../models/ConflictError';
export * from '../models/Contact';
export * from '../models/ContactID';
export * from '../models/ContactIDType';
export * from '../models/Contributor';
export * from '../models/ContributorID';
export * from '../models/ContributorIDType';
export * from '../models/Cost';
export * from '../models/CountryCode';
export * from '../models/CurrencyCode';
export * from '../models/DMP';
export * from '../models/DMPAlreadyExistsError';
export * from '../models/DMPData';
export * from '../models/DMPDocument';
export * from '../models/DMPID';
export * from '../models/DMPIDType';
export * from '../models/DMPInvalidError';
export * from '../models/DMPListResponseBody';
export * from '../models/DMPNotFoundError';
export * from '../models/DMPWithID';
export * from '../models/DataAccess';
export * from '../models/Dataset';
export * from '../models/DatasetID';
export * from '../models/DatasetIDType';
export * from '../models/Distribution';
export * from '../models/FunderID';
export * from '../models/FunderIDType';
export * from '../models/Funding';
export * from '../models/FundingStatus';
export * from '../models/GenericBadRequestError';
export * from '../models/GenericError';
export * from '../models/GrantID';
export * from '../models/GrantIDType';
export * from '../models/Host';
export * from '../models/InsufficientPermissionsError';
export * from '../models/InvalidQueryStringError';
export * from '../models/LanguageID';
export * from '../models/License';
export * from '../models/Metadata';
export * from '../models/MetadataStandardID';
export * from '../models/MetadataStandardIDType';
export * from '../models/ModelError';
export * from '../models/NotAcceptableError';
export * from '../models/PidSystemType';
export * from '../models/Project';
export * from '../models/SecurityAndPrivacyItem';
export * from '../models/TechnicalResource';
export * from '../models/UnsupportedMediaTypeError';

import { AuthenticationRequiredError, AuthenticationRequiredErrorErrorCodeEnum    } from '../models/AuthenticationRequiredError';
import { BadRequestErrorClass } from '../models/BadRequestError';
import { Booleanish } from '../models/Booleanish';
import { Certification } from '../models/Certification';
import { ConflictError, ConflictErrorErrorCodeEnum    } from '../models/ConflictError';
import { Contact } from '../models/Contact';
import { ContactID   } from '../models/ContactID';
import { ContactIDType } from '../models/ContactIDType';
import { Contributor } from '../models/Contributor';
import { ContributorID   } from '../models/ContributorID';
import { ContributorIDType } from '../models/ContributorIDType';
import { Cost     } from '../models/Cost';
import { CountryCode } from '../models/CountryCode';
import { CurrencyCode } from '../models/CurrencyCode';
import { DMP } from '../models/DMP';
import { DMPAlreadyExistsError, DMPAlreadyExistsErrorErrorCodeEnum    } from '../models/DMPAlreadyExistsError';
import { DMPData               } from '../models/DMPData';
import { DMPDocument } from '../models/DMPDocument';
import { DMPID   } from '../models/DMPID';
import { DMPIDType } from '../models/DMPIDType';
import { DMPInvalidError, DMPInvalidErrorErrorCodeEnum    } from '../models/DMPInvalidError';
import { DMPListResponseBody } from '../models/DMPListResponseBody';
import { DMPNotFoundError, DMPNotFoundErrorErrorCodeEnum    } from '../models/DMPNotFoundError';
import { DMPWithID } from '../models/DMPWithID';
import { DataAccess } from '../models/DataAccess';
import { Dataset       , DatasetLanguageEnum   , DatasetPersonalDataEnum    , DatasetSensitiveDataEnum      } from '../models/Dataset';
import { DatasetID   } from '../models/DatasetID';
import { DatasetIDType } from '../models/DatasetIDType';
import { Distribution           } from '../models/Distribution';
import { FunderID   } from '../models/FunderID';
import { FunderIDType } from '../models/FunderIDType';
import { Funding    } from '../models/Funding';
import { FundingStatus } from '../models/FundingStatus';
import { GenericBadRequestError, GenericBadRequestErrorErrorCodeEnum    } from '../models/GenericBadRequestError';
import { GenericError, GenericErrorErrorCodeEnum    } from '../models/GenericError';
import { GrantID   } from '../models/GrantID';
import { GrantIDType } from '../models/GrantIDType';
import { Host            } from '../models/Host';
import { InsufficientPermissionsError, InsufficientPermissionsErrorErrorCodeEnum    } from '../models/InsufficientPermissionsError';
import { InvalidQueryStringError, InvalidQueryStringErrorErrorCodeEnum    } from '../models/InvalidQueryStringError';
import { LanguageID } from '../models/LanguageID';
import { License } from '../models/License';
import { Metadata    } from '../models/Metadata';
import { MetadataStandardID   } from '../models/MetadataStandardID';
import { MetadataStandardIDType } from '../models/MetadataStandardIDType';
import { ModelError } from '../models/ModelError';
import { NotAcceptableError, NotAcceptableErrorErrorCodeEnum    } from '../models/NotAcceptableError';
import { PidSystemType } from '../models/PidSystemType';
import { Project } from '../models/Project';
import { SecurityAndPrivacyItem } from '../models/SecurityAndPrivacyItem';
import { TechnicalResource } from '../models/TechnicalResource';
import { UnsupportedMediaTypeError, UnsupportedMediaTypeErrorErrorCodeEnum    } from '../models/UnsupportedMediaTypeError';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];

let enumsMap: Set<string> = new Set<string>([
    "AuthenticationRequiredErrorErrorCodeEnum",
    "BadRequestErrorErrorCodeEnum",
    "Booleanish",
    "Certification",
    "ConflictErrorErrorCodeEnum",
    "ContactIDType",
    "ContributorIDType",
    "CountryCode",
    "CurrencyCode",
    "DMPAlreadyExistsErrorErrorCodeEnum",
    "DMPIDType",
    "DMPInvalidErrorErrorCodeEnum",
    "DMPNotFoundErrorErrorCodeEnum",
    "DataAccess",
    "DatasetLanguageEnum",
    "DatasetPersonalDataEnum",
    "DatasetSensitiveDataEnum",
    "DatasetIDType",
    "FunderIDType",
    "FundingStatus",
    "GenericBadRequestErrorErrorCodeEnum",
    "GenericErrorErrorCodeEnum",
    "GrantIDType",
    "InsufficientPermissionsErrorErrorCodeEnum",
    "InvalidQueryStringErrorErrorCodeEnum",
    "LanguageID",
    "MetadataStandardIDType",
    "NotAcceptableErrorErrorCodeEnum",
    "PidSystemType",
    "UnsupportedMediaTypeErrorErrorCodeEnum",
]);

let typeMap: {[index: string]: any} = {
    "AuthenticationRequiredError": AuthenticationRequiredError,
    "BadRequestError": BadRequestErrorClass,
    "ConflictError": ConflictError,
    "Contact": Contact,
    "ContactID": ContactID,
    "Contributor": Contributor,
    "ContributorID": ContributorID,
    "Cost": Cost,
    "DMP": DMP,
    "DMPAlreadyExistsError": DMPAlreadyExistsError,
    "DMPData": DMPData,
    "DMPDocument": DMPDocument,
    "DMPID": DMPID,
    "DMPInvalidError": DMPInvalidError,
    "DMPListResponseBody": DMPListResponseBody,
    "DMPNotFoundError": DMPNotFoundError,
    "DMPWithID": DMPWithID,
    "Dataset": Dataset,
    "DatasetID": DatasetID,
    "Distribution": Distribution,
    "FunderID": FunderID,
    "Funding": Funding,
    "GenericBadRequestError": GenericBadRequestError,
    "GenericError": GenericError,
    "GrantID": GrantID,
    "Host": Host,
    "InsufficientPermissionsError": InsufficientPermissionsError,
    "InvalidQueryStringError": InvalidQueryStringError,
    "License": License,
    "Metadata": Metadata,
    "MetadataStandardID": MetadataStandardID,
    "ModelError": ModelError,
    "NotAcceptableError": NotAcceptableError,
    "Project": Project,
    "SecurityAndPrivacyItem": SecurityAndPrivacyItem,
    "TechnicalResource": TechnicalResource,
    "UnsupportedMediaTypeError": UnsupportedMediaTypeError,
}

type MimeTypeDescriptor = {
    type: string;
    subtype: string;
    subtypeTokens: string[];
};

/**
 * Every mime-type consists of a type, subtype, and optional parameters.
 * The subtype can be composite, including information about the content format.
 * For example: `application/json-patch+json`, `application/merge-patch+json`.
 *
 * This helper transforms a string mime-type into an internal representation.
 * This simplifies the implementation of predicates that in turn define common rules for parsing or stringifying
 * the payload.
 */
const parseMimeType = (mimeType: string): MimeTypeDescriptor => {
    const [type = '', subtype = ''] = mimeType.split('/');
    return {
        type,
        subtype,
        subtypeTokens: subtype.split('+'),
    };
};

type MimeTypePredicate = (mimeType: string) => boolean;

// This factory creates a predicate function that checks a string mime-type against defined rules.
const mimeTypePredicateFactory = (predicate: (descriptor: MimeTypeDescriptor) => boolean): MimeTypePredicate => (mimeType) => predicate(parseMimeType(mimeType));

// Use this factory when you need to define a simple predicate based only on type and, if applicable, subtype.
const mimeTypeSimplePredicateFactory = (type: string, subtype?: string): MimeTypePredicate => mimeTypePredicateFactory((descriptor) => {
    if (descriptor.type !== type) return false;
    if (subtype != null && descriptor.subtype !== subtype) return false;
    return true;
});

// Creating a set of named predicates that will help us determine how to handle different mime-types
const isTextLikeMimeType = mimeTypeSimplePredicateFactory('text');
const isJsonMimeType = mimeTypeSimplePredicateFactory('application', 'json');
const isJsonLikeMimeType = mimeTypePredicateFactory((descriptor) => descriptor.type === 'application' && descriptor.subtypeTokens.some((item) => item === 'json'));
const isOctetStreamMimeType = mimeTypeSimplePredicateFactory('application', 'octet-stream');
const isFormUrlencodedMimeType = mimeTypeSimplePredicateFactory('application', 'x-www-form-urlencoded');

// Defining a list of mime-types in the order of prioritization for handling.
const supportedMimeTypePredicatesWithPriority: MimeTypePredicate[] = [
    isJsonMimeType,
    isJsonLikeMimeType,
    isTextLikeMimeType,
    isOctetStreamMimeType,
    isFormUrlencodedMimeType,
];

const nullableSuffix = " | null";
const optionalSuffix = " | undefined";
const arrayPrefix = "Array<";
const arraySuffix = ">";
const mapPrefix = "{ [key: string]: ";
const mapSuffix = "; }";

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap.has(expectedType)) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    let mapping = typeMap[expectedType].mapping;
                    if (mapping != undefined && mapping[discriminatorType]) {
                        return mapping[discriminatorType]; // use the type given in the discriminator
                    } else if(typeMap[discriminatorType]) {
                        return discriminatorType;
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string, format: string): any {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.serialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.serialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.serialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            if (format == "date") {
                let month = data.getMonth()+1
                month = month < 10 ? "0" + month.toString() : month.toString()
                let day = data.getDate();
                day = day < 10 ? "0" + day.toString() : day.toString();

                return data.getFullYear() + "-" + month + "-" + day;
            } else {
                return data.toISOString();
            }
        } else {
            if (enumsMap.has(type)) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }

            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let attributeType of attributeTypes) {
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type, attributeType.format);
            }
            return instance;
        }
    }

    public static deserialize(data: any, type: string, format: string): any {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.endsWith(nullableSuffix)) {
            let subType: string = type.slice(0, -nullableSuffix.length); // Type | null => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.endsWith(optionalSuffix)) {
            let subType: string = type.slice(0, -optionalSuffix.length); // Type | undefined => Type
            return ObjectSerializer.deserialize(data, subType, format);
        } else if (type.startsWith(arrayPrefix)) {
            let subType: string = type.slice(arrayPrefix.length, -arraySuffix.length); // Array<Type> => Type
            let transformedData: any[] = [];
            for (let date of data) {
                transformedData.push(ObjectSerializer.deserialize(date, subType, format));
            }
            return transformedData;
        } else if (type.startsWith(mapPrefix)) {
            let subType: string = type.slice(mapPrefix.length, -mapSuffix.length); // { [key: string]: Type; } => Type
            let transformedData: { [key: string]: any } = {};
            for (let key in data) {
                transformedData[key] = ObjectSerializer.deserialize(
                    data[key],
                    subType,
                    format,
                );
            }
            return transformedData;
        } else if (type === "Date") {
            return new Date(data);
        } else {
            if (enumsMap.has(type)) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let attributeType of attributeTypes) {
                let value = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type, attributeType.format);
                if (value !== undefined) {
                    instance[attributeType.name] = value;
                }
            }
            return instance;
        }
    }


    /**
     * Normalize media type
     *
     * We currently do not handle any media types attributes, i.e. anything
     * after a semicolon. All content is assumed to be UTF-8 compatible.
     */
    public static normalizeMediaType(mediaType: string | undefined): string | undefined {
        if (mediaType === undefined) {
            return undefined;
        }
        return (mediaType.split(";")[0] ?? '').trim().toLowerCase();
    }

    /**
     * From a list of possible media types, choose the one we can handle best.
     *
     * The order of the given media types does not have any impact on the choice
     * made.
     */
    public static getPreferredMediaType(mediaTypes: Array<string>): string {
        /** According to OAS 3 we should default to json */
        if (mediaTypes.length === 0) {
            return "application/json";
        }

        const normalMediaTypes = mediaTypes.map(ObjectSerializer.normalizeMediaType);

        for (const predicate of supportedMimeTypePredicatesWithPriority) {
            for (const mediaType of normalMediaTypes) {
                if (mediaType != null && predicate(mediaType)) {
                    return mediaType;
                }
            }
        }

        throw new Error("None of the given media types are supported: " + mediaTypes.join(", "));
    }

    /**
     * Convert data to a string according the given media type
     */
    public static stringify(data: any, mediaType: string): string {
        if (isTextLikeMimeType(mediaType)) {
            return String(data);
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSON.stringify(data);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.stringify.");
    }

    /**
     * Parse data from a string according to the given media type
     */
    public static parse(rawData: string, mediaType: string | undefined) {
        if (mediaType === undefined) {
            throw new Error("Cannot parse content. No Content-Type defined.");
        }

        if (isTextLikeMimeType(mediaType)) {
            return rawData;
        }

        if (isJsonLikeMimeType(mediaType)) {
            return JSON.parse(rawData);
        }

        throw new Error("The mediaType " + mediaType + " is not supported by ObjectSerializer.parse.");
    }
}
