// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { AuthenticationRequiredError } from '../models/AuthenticationRequiredError';
import { BadRequestError } from '../models/BadRequestError';
import { ConflictError } from '../models/ConflictError';
import { DMPDocument } from '../models/DMPDocument';
import { DMPListResponseBody } from '../models/DMPListResponseBody';
import { DMPNotFoundError } from '../models/DMPNotFoundError';
import { DMPWithID } from '../models/DMPWithID';
import { GenericError } from '../models/GenericError';
import { InsufficientPermissionsError } from '../models/InsufficientPermissionsError';
import { LanguageID } from '../models/LanguageID';
import { NotAcceptableError } from '../models/NotAcceptableError';
import { UnsupportedMediaTypeError } from '../models/UnsupportedMediaTypeError';

/**
 * no description
 */
export class DMPApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 
     * Create a DMP
     * @param dMPDocument 
     */
    public async createDMP(dMPDocument: DMPDocument, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'dMPDocument' is not null or undefined
        if (dMPDocument === null || dMPDocument === undefined) {
            throw new RequiredError("DMPApi", "createDMP", "dMPDocument");
        }


        // Path Params
        const localVarPath = '/dmps';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/vnd.org.rd-alliance.dmp-common.v1.2+json",
        
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dMPDocument, "DMPDocument", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete a DMP based on its ID.
     * Delete a DMP
     * @param id 
     */
    public async deleteDMP(id: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new RequiredError("DMPApi", "deleteDMP", "id");
        }


        // Path Params
        const localVarPath = '/dmps/{id}'
            .replace('{' + 'id' + '}', encodeURIComponent(String(id)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Fetch a DMP based on its ID. 
     * Get a DMP
     * @param id 
     */
    public async getDMP(id: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new RequiredError("DMPApi", "getDMP", "id");
        }


        // Path Params
        const localVarPath = '/dmps/{id}'
            .replace('{' + 'id' + '}', encodeURIComponent(String(id)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 
     * List/search DMPs
     * @param offset Number of items to skip from the start.
     * @param count Number of items to fetch.
     * @param sort A list of fields to sort by with the sort order. 
     * @param createdBefore 
     * @param createdAfter 
     * @param modifiedBefore 
     * @param modifiedAfter 
     * @param languages 
     * @param contactIds 
     * @param contributorIds 
     * @param datasetIds 
     * @param metadataStandardIds 
     * @param dmpIds 
     * @param funderIds 
     * @param grantIds 
     * @param query 
     * @param ethicalIssuesExist 
     * @param embargoBefore 
     * @param embargoAfter 
     */
    public async listDMPs(offset?: number, count?: number, sort?: Array<'title,asc' | 'title,desc' | 'created,asc' | 'created,desc' | 'modified,asc' | 'modified,desc' | 'language,asc' | 'language,desc' | 'embargo,asc' | 'embargo,desc' | 'keyword,asc' | 'keyword,desc'>, createdBefore?: Date, createdAfter?: Date, modifiedBefore?: Date, modifiedAfter?: Date, languages?: Array<LanguageID>, contactIds?: Array<string>, contributorIds?: Array<string>, datasetIds?: Array<string>, metadataStandardIds?: Array<string>, dmpIds?: Array<string>, funderIds?: Array<string>, grantIds?: Array<string>, query?: string, ethicalIssuesExist?: boolean, embargoBefore?: string, embargoAfter?: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;




















        // Path Params
        const localVarPath = '/dmps';

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Query Params
        if (offset !== undefined) {
            requestContext.setQueryParam("offset", ObjectSerializer.serialize(offset, "number", ""));
        }

        // Query Params
        if (count !== undefined) {
            requestContext.setQueryParam("count", ObjectSerializer.serialize(count, "number", ""));
        }

        // Query Params
        if (sort !== undefined) {
            const serializedParams = ObjectSerializer.serialize(sort, "Array<'title,asc' | 'title,desc' | 'created,asc' | 'created,desc' | 'modified,asc' | 'modified,desc' | 'language,asc' | 'language,desc' | 'embargo,asc' | 'embargo,desc' | 'keyword,asc' | 'keyword,desc'>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("sort[]", serializedParam);
            }
        }

        // Query Params
        if (createdBefore !== undefined) {
            requestContext.setQueryParam("created_before", ObjectSerializer.serialize(createdBefore, "Date", "date-time"));
        }

        // Query Params
        if (createdAfter !== undefined) {
            requestContext.setQueryParam("created_after", ObjectSerializer.serialize(createdAfter, "Date", "date-time"));
        }

        // Query Params
        if (modifiedBefore !== undefined) {
            requestContext.setQueryParam("modified_before", ObjectSerializer.serialize(modifiedBefore, "Date", "date-time"));
        }

        // Query Params
        if (modifiedAfter !== undefined) {
            requestContext.setQueryParam("modified_after", ObjectSerializer.serialize(modifiedAfter, "Date", "date-time"));
        }

        // Query Params
        if (languages !== undefined) {
            const serializedParams = ObjectSerializer.serialize(languages, "Array<LanguageID>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("languages[]", serializedParam);
            }
        }

        // Query Params
        if (contactIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(contactIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("contact_ids[]", serializedParam);
            }
        }

        // Query Params
        if (contributorIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(contributorIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("contributor_ids[]", serializedParam);
            }
        }

        // Query Params
        if (datasetIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(datasetIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("dataset_ids[]", serializedParam);
            }
        }

        // Query Params
        if (metadataStandardIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(metadataStandardIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("metadata_standard_ids[]", serializedParam);
            }
        }

        // Query Params
        if (dmpIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(dmpIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("dmp_ids[]", serializedParam);
            }
        }

        // Query Params
        if (funderIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(funderIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("funder_ids[]", serializedParam);
            }
        }

        // Query Params
        if (grantIds !== undefined) {
            const serializedParams = ObjectSerializer.serialize(grantIds, "Array<string>", "");
            for (const serializedParam of serializedParams) {
                requestContext.appendQueryParam("grant_ids[]", serializedParam);
            }
        }

        // Query Params
        if (query !== undefined) {
            requestContext.setQueryParam("query", ObjectSerializer.serialize(query, "string", ""));
        }

        // Query Params
        if (ethicalIssuesExist !== undefined) {
            requestContext.setQueryParam("ethical_issues_exist", ObjectSerializer.serialize(ethicalIssuesExist, "boolean", ""));
        }

        // Query Params
        if (embargoBefore !== undefined) {
            requestContext.setQueryParam("embargo_before", ObjectSerializer.serialize(embargoBefore, "string", "date"));
        }

        // Query Params
        if (embargoAfter !== undefined) {
            requestContext.setQueryParam("embargo_after", ObjectSerializer.serialize(embargoAfter, "string", "date"));
        }


        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 
     * Overwrite a DMP
     * @param id 
     * @param dMPDocument 
     * @param ifUnmodifiedSince 
     */
    public async putDMP(id: string, dMPDocument: DMPDocument, ifUnmodifiedSince?: Date, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new RequiredError("DMPApi", "putDMP", "id");
        }


        // verify required parameter 'dMPDocument' is not null or undefined
        if (dMPDocument === null || dMPDocument === undefined) {
            throw new RequiredError("DMPApi", "putDMP", "dMPDocument");
        }



        // Path Params
        const localVarPath = '/dmps/{id}'
            .replace('{' + 'id' + '}', encodeURIComponent(String(id)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")

        // Header Params
        requestContext.setHeaderParam("If-Unmodified-Since", ObjectSerializer.serialize(ifUnmodifiedSince, "Date", "date-time"));


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/vnd.org.rd-alliance.dmp-common.v1.2+json",
        
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(dMPDocument, "DMPDocument", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        
        const defaultAuth: SecurityAuthentication | undefined = _config?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class DMPApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createDMP
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createDMPWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DMPWithID >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: BadRequestError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BadRequestError", ""
            ) as BadRequestError;
            throw new ApiException<BadRequestError>(response.httpStatusCode, "Bad request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: AuthenticationRequiredError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AuthenticationRequiredError", ""
            ) as AuthenticationRequiredError;
            throw new ApiException<AuthenticationRequiredError>(response.httpStatusCode, "Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication. ", body, response.headers);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: InsufficientPermissionsError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InsufficientPermissionsError", ""
            ) as InsufficientPermissionsError;
            throw new ApiException<InsufficientPermissionsError>(response.httpStatusCode, "Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP. ", body, response.headers);
        }
        if (isCodeInRange("406", response.httpStatusCode)) {
            const body: NotAcceptableError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NotAcceptableError", ""
            ) as NotAcceptableError;
            throw new ApiException<NotAcceptableError>(response.httpStatusCode, "The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header. ", body, response.headers);
        }
        if (isCodeInRange("409", response.httpStatusCode)) {
            const body: ConflictError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConflictError", ""
            ) as ConflictError;
            throw new ApiException<ConflictError>(response.httpStatusCode, "A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request. ", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: GenericError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GenericError", ""
            ) as GenericError;
            throw new ApiException<GenericError>(response.httpStatusCode, "The request failed", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteDMP
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteDMPWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("204", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: AuthenticationRequiredError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AuthenticationRequiredError", ""
            ) as AuthenticationRequiredError;
            throw new ApiException<AuthenticationRequiredError>(response.httpStatusCode, "Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication. ", body, response.headers);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: InsufficientPermissionsError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InsufficientPermissionsError", ""
            ) as InsufficientPermissionsError;
            throw new ApiException<InsufficientPermissionsError>(response.httpStatusCode, "Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP. ", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: DMPNotFoundError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPNotFoundError", ""
            ) as DMPNotFoundError;
            throw new ApiException<DMPNotFoundError>(response.httpStatusCode, "DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs. ", body, response.headers);
        }
        if (isCodeInRange("406", response.httpStatusCode)) {
            const body: NotAcceptableError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NotAcceptableError", ""
            ) as NotAcceptableError;
            throw new ApiException<NotAcceptableError>(response.httpStatusCode, "The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header. ", body, response.headers);
        }
        if (isCodeInRange("409", response.httpStatusCode)) {
            const body: ConflictError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConflictError", ""
            ) as ConflictError;
            throw new ApiException<ConflictError>(response.httpStatusCode, "A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request. ", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: GenericError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GenericError", ""
            ) as GenericError;
            throw new ApiException<GenericError>(response.httpStatusCode, "The request failed", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getDMP
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getDMPWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DMPWithID >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: AuthenticationRequiredError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AuthenticationRequiredError", ""
            ) as AuthenticationRequiredError;
            throw new ApiException<AuthenticationRequiredError>(response.httpStatusCode, "Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication. ", body, response.headers);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: InsufficientPermissionsError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InsufficientPermissionsError", ""
            ) as InsufficientPermissionsError;
            throw new ApiException<InsufficientPermissionsError>(response.httpStatusCode, "Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP. ", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: DMPNotFoundError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPNotFoundError", ""
            ) as DMPNotFoundError;
            throw new ApiException<DMPNotFoundError>(response.httpStatusCode, "DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs. ", body, response.headers);
        }
        if (isCodeInRange("406", response.httpStatusCode)) {
            const body: NotAcceptableError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NotAcceptableError", ""
            ) as NotAcceptableError;
            throw new ApiException<NotAcceptableError>(response.httpStatusCode, "The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header. ", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: GenericError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GenericError", ""
            ) as GenericError;
            throw new ApiException<GenericError>(response.httpStatusCode, "The request failed", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listDMPs
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listDMPsWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DMPListResponseBody >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DMPListResponseBody = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPListResponseBody", ""
            ) as DMPListResponseBody;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: BadRequestError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BadRequestError", ""
            ) as BadRequestError;
            throw new ApiException<BadRequestError>(response.httpStatusCode, "Bad request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: AuthenticationRequiredError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AuthenticationRequiredError", ""
            ) as AuthenticationRequiredError;
            throw new ApiException<AuthenticationRequiredError>(response.httpStatusCode, "Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication. ", body, response.headers);
        }
        if (isCodeInRange("406", response.httpStatusCode)) {
            const body: NotAcceptableError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NotAcceptableError", ""
            ) as NotAcceptableError;
            throw new ApiException<NotAcceptableError>(response.httpStatusCode, "The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header. ", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: GenericError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GenericError", ""
            ) as GenericError;
            throw new ApiException<GenericError>(response.httpStatusCode, "The request failed", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DMPListResponseBody = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPListResponseBody", ""
            ) as DMPListResponseBody;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to putDMP
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async putDMPWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DMPWithID >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("400", response.httpStatusCode)) {
            const body: BadRequestError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "BadRequestError", ""
            ) as BadRequestError;
            throw new ApiException<BadRequestError>(response.httpStatusCode, "Bad request", body, response.headers);
        }
        if (isCodeInRange("401", response.httpStatusCode)) {
            const body: AuthenticationRequiredError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "AuthenticationRequiredError", ""
            ) as AuthenticationRequiredError;
            throw new ApiException<AuthenticationRequiredError>(response.httpStatusCode, "Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication. ", body, response.headers);
        }
        if (isCodeInRange("403", response.httpStatusCode)) {
            const body: InsufficientPermissionsError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "InsufficientPermissionsError", ""
            ) as InsufficientPermissionsError;
            throw new ApiException<InsufficientPermissionsError>(response.httpStatusCode, "Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP. ", body, response.headers);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: DMPNotFoundError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPNotFoundError", ""
            ) as DMPNotFoundError;
            throw new ApiException<DMPNotFoundError>(response.httpStatusCode, "DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs. ", body, response.headers);
        }
        if (isCodeInRange("406", response.httpStatusCode)) {
            const body: NotAcceptableError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "NotAcceptableError", ""
            ) as NotAcceptableError;
            throw new ApiException<NotAcceptableError>(response.httpStatusCode, "The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header. ", body, response.headers);
        }
        if (isCodeInRange("409", response.httpStatusCode)) {
            const body: ConflictError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ConflictError", ""
            ) as ConflictError;
            throw new ApiException<ConflictError>(response.httpStatusCode, "A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request. ", body, response.headers);
        }
        if (isCodeInRange("415", response.httpStatusCode)) {
            const body: UnsupportedMediaTypeError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "UnsupportedMediaTypeError", ""
            ) as UnsupportedMediaTypeError;
            throw new ApiException<UnsupportedMediaTypeError>(response.httpStatusCode, "The server cannot process the request the client because it does not support the DMP standard the client sent the document in. ", body, response.headers);
        }
        if (isCodeInRange("0", response.httpStatusCode)) {
            const body: GenericError = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GenericError", ""
            ) as GenericError;
            throw new ApiException<GenericError>(response.httpStatusCode, "The request failed", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DMPWithID = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DMPWithID", ""
            ) as DMPWithID;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
