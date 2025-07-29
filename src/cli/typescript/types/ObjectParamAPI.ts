import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration, ConfigurationOptions } from '../configuration'
import type { Middleware } from '../middleware';

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

import { ObservableDMPApi } from "./ObservableAPI";
import { DMPApiRequestFactory, DMPApiResponseProcessor} from "../apis/DMPApi";

export interface DMPApiCreateDMPRequest {
    /**
     * 
     * @type DMPDocument
     * @memberof DMPApicreateDMP
     */
    dMPDocument: DMPDocument
}

export interface DMPApiDeleteDMPRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApideleteDMP
     */
    id: string
}

export interface DMPApiGetDMPRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApigetDMP
     */
    id: string
}

export interface DMPApiListDMPsRequest {
    /**
     * Number of items to skip from the start.
     * Minimum: 0
     * Defaults to: 0
     * @type number
     * @memberof DMPApilistDMPs
     */
    offset?: number
    /**
     * Number of items to fetch.
     * Minimum: 1
     * Maximum: 100
     * Defaults to: 20
     * @type number
     * @memberof DMPApilistDMPs
     */
    count?: number
    /**
     * A list of fields to sort by with the sort order. 
     * Defaults to: undefined
     * @type Array&lt;&#39;title,asc&#39; | &#39;title,desc&#39; | &#39;created,asc&#39; | &#39;created,desc&#39; | &#39;modified,asc&#39; | &#39;modified,desc&#39; | &#39;language,asc&#39; | &#39;language,desc&#39; | &#39;embargo,asc&#39; | &#39;embargo,desc&#39; | &#39;keyword,asc&#39; | &#39;keyword,desc&#39;&gt;
     * @memberof DMPApilistDMPs
     */
    sort?: Array<'title,asc' | 'title,desc' | 'created,asc' | 'created,desc' | 'modified,asc' | 'modified,desc' | 'language,asc' | 'language,desc' | 'embargo,asc' | 'embargo,desc' | 'keyword,asc' | 'keyword,desc'>
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof DMPApilistDMPs
     */
    createdBefore?: Date
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof DMPApilistDMPs
     */
    createdAfter?: Date
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof DMPApilistDMPs
     */
    modifiedBefore?: Date
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof DMPApilistDMPs
     */
    modifiedAfter?: Date
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;LanguageID&gt;
     * @memberof DMPApilistDMPs
     */
    languages?: Array<LanguageID>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    contactIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    contributorIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    datasetIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    metadataStandardIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    dmpIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    funderIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type Array&lt;string&gt;
     * @memberof DMPApilistDMPs
     */
    grantIds?: Array<string>
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApilistDMPs
     */
    query?: string
    /**
     * 
     * Defaults to: undefined
     * @type boolean
     * @memberof DMPApilistDMPs
     */
    ethicalIssuesExist?: boolean
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApilistDMPs
     */
    embargoBefore?: string
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApilistDMPs
     */
    embargoAfter?: string
}

export interface DMPApiPutDMPRequest {
    /**
     * 
     * Defaults to: undefined
     * @type string
     * @memberof DMPApiputDMP
     */
    id: string
    /**
     * 
     * @type DMPDocument
     * @memberof DMPApiputDMP
     */
    dMPDocument: DMPDocument
    /**
     * 
     * Defaults to: undefined
     * @type Date
     * @memberof DMPApiputDMP
     */
    ifUnmodifiedSince?: Date
}

export class ObjectDMPApi {
    private api: ObservableDMPApi

    public constructor(configuration: Configuration, requestFactory?: DMPApiRequestFactory, responseProcessor?: DMPApiResponseProcessor) {
        this.api = new ObservableDMPApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 
     * Create a DMP
     * @param param the request object
     */
    public createDMPWithHttpInfo(param: DMPApiCreateDMPRequest, options?: ConfigurationOptions): Promise<HttpInfo<DMPWithID>> {
        return this.api.createDMPWithHttpInfo(param.dMPDocument,  options).toPromise();
    }

    /**
     * Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 
     * Create a DMP
     * @param param the request object
     */
    public createDMP(param: DMPApiCreateDMPRequest, options?: ConfigurationOptions): Promise<DMPWithID> {
        return this.api.createDMP(param.dMPDocument,  options).toPromise();
    }

    /**
     * Delete a DMP based on its ID.
     * Delete a DMP
     * @param param the request object
     */
    public deleteDMPWithHttpInfo(param: DMPApiDeleteDMPRequest, options?: ConfigurationOptions): Promise<HttpInfo<void>> {
        return this.api.deleteDMPWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Delete a DMP based on its ID.
     * Delete a DMP
     * @param param the request object
     */
    public deleteDMP(param: DMPApiDeleteDMPRequest, options?: ConfigurationOptions): Promise<void> {
        return this.api.deleteDMP(param.id,  options).toPromise();
    }

    /**
     * Fetch a DMP based on its ID. 
     * Get a DMP
     * @param param the request object
     */
    public getDMPWithHttpInfo(param: DMPApiGetDMPRequest, options?: ConfigurationOptions): Promise<HttpInfo<DMPWithID>> {
        return this.api.getDMPWithHttpInfo(param.id,  options).toPromise();
    }

    /**
     * Fetch a DMP based on its ID. 
     * Get a DMP
     * @param param the request object
     */
    public getDMP(param: DMPApiGetDMPRequest, options?: ConfigurationOptions): Promise<DMPWithID> {
        return this.api.getDMP(param.id,  options).toPromise();
    }

    /**
     * This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 
     * List/search DMPs
     * @param param the request object
     */
    public listDMPsWithHttpInfo(param: DMPApiListDMPsRequest = {}, options?: ConfigurationOptions): Promise<HttpInfo<DMPListResponseBody>> {
        return this.api.listDMPsWithHttpInfo(param.offset, param.count, param.sort, param.createdBefore, param.createdAfter, param.modifiedBefore, param.modifiedAfter, param.languages, param.contactIds, param.contributorIds, param.datasetIds, param.metadataStandardIds, param.dmpIds, param.funderIds, param.grantIds, param.query, param.ethicalIssuesExist, param.embargoBefore, param.embargoAfter,  options).toPromise();
    }

    /**
     * This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 
     * List/search DMPs
     * @param param the request object
     */
    public listDMPs(param: DMPApiListDMPsRequest = {}, options?: ConfigurationOptions): Promise<DMPListResponseBody> {
        return this.api.listDMPs(param.offset, param.count, param.sort, param.createdBefore, param.createdAfter, param.modifiedBefore, param.modifiedAfter, param.languages, param.contactIds, param.contributorIds, param.datasetIds, param.metadataStandardIds, param.dmpIds, param.funderIds, param.grantIds, param.query, param.ethicalIssuesExist, param.embargoBefore, param.embargoAfter,  options).toPromise();
    }

    /**
     * Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 
     * Overwrite a DMP
     * @param param the request object
     */
    public putDMPWithHttpInfo(param: DMPApiPutDMPRequest, options?: ConfigurationOptions): Promise<HttpInfo<DMPWithID>> {
        return this.api.putDMPWithHttpInfo(param.id, param.dMPDocument, param.ifUnmodifiedSince,  options).toPromise();
    }

    /**
     * Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 
     * Overwrite a DMP
     * @param param the request object
     */
    public putDMP(param: DMPApiPutDMPRequest, options?: ConfigurationOptions): Promise<DMPWithID> {
        return this.api.putDMP(param.id, param.dMPDocument, param.ifUnmodifiedSince,  options).toPromise();
    }

}
