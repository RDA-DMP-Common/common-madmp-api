import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions, mergeConfiguration } from '../configuration'
import type { Middleware } from '../middleware';
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
import { AuthenticationRequiredError } from '../models/AuthenticationRequiredError';
import { BadRequestError } from '../models/BadRequestError';
import { Booleanish } from '../models/Booleanish';
import { Certification } from '../models/Certification';
import { ConflictError } from '../models/ConflictError';
import { Contact } from '../models/Contact';
import { ContactID } from '../models/ContactID';
import { ContactIDType } from '../models/ContactIDType';
import { Contributor } from '../models/Contributor';
import { ContributorID } from '../models/ContributorID';
import { ContributorIDType } from '../models/ContributorIDType';
import { Cost } from '../models/Cost';
import { CountryCode } from '../models/CountryCode';
import { CurrencyCode } from '../models/CurrencyCode';
import { DMP } from '../models/DMP';
import { DMPAlreadyExistsError } from '../models/DMPAlreadyExistsError';
import { DMPData } from '../models/DMPData';
import { DMPDocument } from '../models/DMPDocument';
import { DMPID } from '../models/DMPID';
import { DMPIDType } from '../models/DMPIDType';
import { DMPInvalidError } from '../models/DMPInvalidError';
import { DMPListResponseBody } from '../models/DMPListResponseBody';
import { DMPNotFoundError } from '../models/DMPNotFoundError';
import { DMPWithID } from '../models/DMPWithID';
import { DataAccess } from '../models/DataAccess';
import { Dataset } from '../models/Dataset';
import { DatasetID } from '../models/DatasetID';
import { DatasetIDType } from '../models/DatasetIDType';
import { Distribution } from '../models/Distribution';
import { FunderID } from '../models/FunderID';
import { FunderIDType } from '../models/FunderIDType';
import { Funding } from '../models/Funding';
import { FundingStatus } from '../models/FundingStatus';
import { GenericBadRequestError } from '../models/GenericBadRequestError';
import { GenericError } from '../models/GenericError';
import { GrantID } from '../models/GrantID';
import { GrantIDType } from '../models/GrantIDType';
import { Host } from '../models/Host';
import { InsufficientPermissionsError } from '../models/InsufficientPermissionsError';
import { InvalidQueryStringError } from '../models/InvalidQueryStringError';
import { LanguageID } from '../models/LanguageID';
import { License } from '../models/License';
import { Metadata } from '../models/Metadata';
import { MetadataStandardID } from '../models/MetadataStandardID';
import { MetadataStandardIDType } from '../models/MetadataStandardIDType';
import { ModelError } from '../models/ModelError';
import { NotAcceptableError } from '../models/NotAcceptableError';
import { PidSystemType } from '../models/PidSystemType';
import { Project } from '../models/Project';
import { SecurityAndPrivacyItem } from '../models/SecurityAndPrivacyItem';
import { TechnicalResource } from '../models/TechnicalResource';
import { UnsupportedMediaTypeError } from '../models/UnsupportedMediaTypeError';

import { DMPApiRequestFactory, DMPApiResponseProcessor} from "../apis/DMPApi";
export class ObservableDMPApi {
    private requestFactory: DMPApiRequestFactory;
    private responseProcessor: DMPApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: DMPApiRequestFactory,
        responseProcessor?: DMPApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new DMPApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new DMPApiResponseProcessor();
    }

    /**
     * Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 
     * Create a DMP
     * @param dMPDocument
     */
    public createDMPWithHttpInfo(dMPDocument: DMPDocument, _options?: ConfigurationOptions): Observable<HttpInfo<DMPWithID>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.createDMP(dMPDocument, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createDMPWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 
     * Create a DMP
     * @param dMPDocument
     */
    public createDMP(dMPDocument: DMPDocument, _options?: ConfigurationOptions): Observable<DMPWithID> {
        return this.createDMPWithHttpInfo(dMPDocument, _options).pipe(map((apiResponse: HttpInfo<DMPWithID>) => apiResponse.data));
    }

    /**
     * Delete a DMP based on its ID.
     * Delete a DMP
     * @param id
     */
    public deleteDMPWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<void>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.deleteDMP(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteDMPWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a DMP based on its ID.
     * Delete a DMP
     * @param id
     */
    public deleteDMP(id: string, _options?: ConfigurationOptions): Observable<void> {
        return this.deleteDMPWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Fetch a DMP based on its ID. 
     * Get a DMP
     * @param id
     */
    public getDMPWithHttpInfo(id: string, _options?: ConfigurationOptions): Observable<HttpInfo<DMPWithID>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.getDMP(id, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getDMPWithHttpInfo(rsp)));
            }));
    }

    /**
     * Fetch a DMP based on its ID. 
     * Get a DMP
     * @param id
     */
    public getDMP(id: string, _options?: ConfigurationOptions): Observable<DMPWithID> {
        return this.getDMPWithHttpInfo(id, _options).pipe(map((apiResponse: HttpInfo<DMPWithID>) => apiResponse.data));
    }

    /**
     * This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 
     * List/search DMPs
     * @param [offset] Number of items to skip from the start.
     * @param [count] Number of items to fetch.
     * @param [sort] A list of fields to sort by with the sort order. 
     * @param [createdBefore]
     * @param [createdAfter]
     * @param [modifiedBefore]
     * @param [modifiedAfter]
     * @param [languages]
     * @param [contactIds]
     * @param [contributorIds]
     * @param [datasetIds]
     * @param [metadataStandardIds]
     * @param [dmpIds]
     * @param [funderIds]
     * @param [grantIds]
     * @param [query]
     * @param [ethicalIssuesExist]
     * @param [embargoBefore]
     * @param [embargoAfter]
     */
    public listDMPsWithHttpInfo(offset?: number, count?: number, sort?: Array<'title,asc' | 'title,desc' | 'created,asc' | 'created,desc' | 'modified,asc' | 'modified,desc' | 'language,asc' | 'language,desc' | 'embargo,asc' | 'embargo,desc' | 'keyword,asc' | 'keyword,desc'>, createdBefore?: Date, createdAfter?: Date, modifiedBefore?: Date, modifiedAfter?: Date, languages?: Array<LanguageID>, contactIds?: Array<string>, contributorIds?: Array<string>, datasetIds?: Array<string>, metadataStandardIds?: Array<string>, dmpIds?: Array<string>, funderIds?: Array<string>, grantIds?: Array<string>, query?: string, ethicalIssuesExist?: boolean, embargoBefore?: string, embargoAfter?: string, _options?: ConfigurationOptions): Observable<HttpInfo<DMPListResponseBody>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.listDMPs(offset, count, sort, createdBefore, createdAfter, modifiedBefore, modifiedAfter, languages, contactIds, contributorIds, datasetIds, metadataStandardIds, dmpIds, funderIds, grantIds, query, ethicalIssuesExist, embargoBefore, embargoAfter, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listDMPsWithHttpInfo(rsp)));
            }));
    }

    /**
     * This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 
     * List/search DMPs
     * @param [offset] Number of items to skip from the start.
     * @param [count] Number of items to fetch.
     * @param [sort] A list of fields to sort by with the sort order. 
     * @param [createdBefore]
     * @param [createdAfter]
     * @param [modifiedBefore]
     * @param [modifiedAfter]
     * @param [languages]
     * @param [contactIds]
     * @param [contributorIds]
     * @param [datasetIds]
     * @param [metadataStandardIds]
     * @param [dmpIds]
     * @param [funderIds]
     * @param [grantIds]
     * @param [query]
     * @param [ethicalIssuesExist]
     * @param [embargoBefore]
     * @param [embargoAfter]
     */
    public listDMPs(offset?: number, count?: number, sort?: Array<'title,asc' | 'title,desc' | 'created,asc' | 'created,desc' | 'modified,asc' | 'modified,desc' | 'language,asc' | 'language,desc' | 'embargo,asc' | 'embargo,desc' | 'keyword,asc' | 'keyword,desc'>, createdBefore?: Date, createdAfter?: Date, modifiedBefore?: Date, modifiedAfter?: Date, languages?: Array<LanguageID>, contactIds?: Array<string>, contributorIds?: Array<string>, datasetIds?: Array<string>, metadataStandardIds?: Array<string>, dmpIds?: Array<string>, funderIds?: Array<string>, grantIds?: Array<string>, query?: string, ethicalIssuesExist?: boolean, embargoBefore?: string, embargoAfter?: string, _options?: ConfigurationOptions): Observable<DMPListResponseBody> {
        return this.listDMPsWithHttpInfo(offset, count, sort, createdBefore, createdAfter, modifiedBefore, modifiedAfter, languages, contactIds, contributorIds, datasetIds, metadataStandardIds, dmpIds, funderIds, grantIds, query, ethicalIssuesExist, embargoBefore, embargoAfter, _options).pipe(map((apiResponse: HttpInfo<DMPListResponseBody>) => apiResponse.data));
    }

    /**
     * Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 
     * Overwrite a DMP
     * @param id
     * @param dMPDocument
     * @param [ifUnmodifiedSince]
     */
    public putDMPWithHttpInfo(id: string, dMPDocument: DMPDocument, ifUnmodifiedSince?: Date, _options?: ConfigurationOptions): Observable<HttpInfo<DMPWithID>> {
        const _config = mergeConfiguration(this.configuration, _options);

        const requestContextPromise = this.requestFactory.putDMP(id, dMPDocument, ifUnmodifiedSince, _config);
        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (const middleware of _config.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => _config.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (const middleware of _config.middleware.reverse()) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.putDMPWithHttpInfo(rsp)));
            }));
    }

    /**
     * Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 
     * Overwrite a DMP
     * @param id
     * @param dMPDocument
     * @param [ifUnmodifiedSince]
     */
    public putDMP(id: string, dMPDocument: DMPDocument, ifUnmodifiedSince?: Date, _options?: ConfigurationOptions): Observable<DMPWithID> {
        return this.putDMPWithHttpInfo(id, dMPDocument, ifUnmodifiedSince, _options).pipe(map((apiResponse: HttpInfo<DMPWithID>) => apiResponse.data));
    }

}
