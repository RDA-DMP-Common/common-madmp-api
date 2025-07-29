# .DMPApi

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDMP**](DMPApi.md#createDMP) | **POST** /dmps | Create a DMP
[**deleteDMP**](DMPApi.md#deleteDMP) | **DELETE** /dmps/{id} | Delete a DMP
[**getDMP**](DMPApi.md#getDMP) | **GET** /dmps/{id} | Get a DMP
[**listDMPs**](DMPApi.md#listDMPs) | **GET** /dmps | List/search DMPs
[**putDMP**](DMPApi.md#putDMP) | **PUT** /dmps/{id} | Overwrite a DMP


# **createDMP**
> DMPWithID createDMP(dMPDocument)

Create or import a DMP from a JSON-formed DMP object. The implementation may opt to allow the creation of draft DMPs with formally valid, but incomplete fields. Alternatively, the implementation may reject incomplete DMPs if it cannot store them. 

### Example


```typescript
import { createConfiguration, DMPApi } from '';
import type { DMPApiCreateDMPRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DMPApi(configuration);

const request: DMPApiCreateDMPRequest = {
  
  dMPDocument: {
    dmp: {
      contact: {
        contactId: {
          identifier: "identifier_example",
          type: "orcid",
        },
        mbox: "mbox_example",
        name: "name_example",
      },
      contributor: [
        {
          contributorId: {
            identifier: "identifier_example",
            type: "orcid",
          },
          mbox: "mbox_example",
          name: "name_example",
          role: [
            "role_example",
          ],
        },
      ],
      cost: [
        {
          currencyCode: "AED",
          description: "description_example",
          title: "title_example",
          value: 3.14,
        },
      ],
      created: new Date('1970-01-01T00:00:00.00Z'),
      dataset: [
        {
          dataQualityAssurance: [
            "dataQualityAssurance_example",
          ],
          datasetId: {
            identifier: "identifier_example",
            type: "handle",
          },
          description: "description_example",
          distribution: [
            {
              accessUrl: "accessUrl_example",
              availableUntil: new Date('1970-01-01').toISOString().split('T')[0];,
              byteSize: 1,
              dataAccess: "open",
              description: "description_example",
              downloadUrl: "downloadUrl_example",
              format: [
                "format_example",
              ],
              host: {
                availability: "availability_example",
                backupFrequency: "backupFrequency_example",
                backupType: "backupType_example",
                certifiedWith: "din31644",
                description: "description_example",
                geoLocation: "AD",
                pidSystem: [
                  "ark",
                ],
                storageType: "storageType_example",
                supportVersioning: "yes",
                title: "title_example",
                url: "url_example",
              },
              license: [
                {
                  licenseRef: "licenseRef_example",
                  startDate: new Date('1970-01-01').toISOString().split('T')[0];,
                },
              ],
              title: "title_example",
            },
          ],
          isReused: true,
          issued: new Date('1970-01-01').toISOString().split('T')[0];,
          keyword: [
            "keyword_example",
          ],
          language: "aar",
          metadata: [
            {
              description: "description_example",
              language: "aar",
              metadataStandardId: {
                identifier: "identifier_example",
                type: "url",
              },
            },
          ],
          personalData: "yes",
          preservationStatement: "preservationStatement_example",
          securityAndPrivacy: [
            {
              description: "description_example",
              title: "title_example",
            },
          ],
          sensitiveData: "yes",
          technicalResource: [
            {
              description: "description_example",
              name: "name_example",
            },
          ],
          title: "title_example",
          type: "type_example",
        },
      ],
      description: "description_example",
      dmpId: {
        identifier: "identifier_example",
        type: "handle",
      },
      ethicalIssuesDescription: "ethicalIssuesDescription_example",
      ethicalIssuesExist: "yes",
      ethicalIssuesReport: "ethicalIssuesReport_example",
      language: "aar",
      modified: new Date('1970-01-01T00:00:00.00Z'),
      project: [
        {
          description: "description_example",
          end: new Date('1970-01-01').toISOString().split('T')[0];,
          funding: [
            {
              funderId: {
                identifier: "identifier_example",
                type: "fundref",
              },
              fundingStatus: "planned",
              grantId: {
                identifier: "identifier_example",
                type: "url",
              },
            },
          ],
          start: new Date('1970-01-01').toISOString().split('T')[0];,
          title: "title_example",
        },
      ],
      title: "title_example",
    },
  },
};

const data = await apiInstance.createDMP(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dMPDocument** | **DMPDocument**|  |


### Return type

**DMPWithID**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json
 - **Accept**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | DMP successfully created |  * Last-Modified - The server should expose the time the DMP was last modified to allow for a conditional PUT request. This is especially important if the server does not support PATCH requests.  <br>  |
**400** | Bad request |  -  |
**401** | Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication.  |  -  |
**403** | Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP.  |  -  |
**406** | The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header.  |  -  |
**409** | A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request.  |  -  |
**0** | The request failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDMP**
> void deleteDMP()

Delete a DMP based on its ID.

### Example


```typescript
import { createConfiguration, DMPApi } from '';
import type { DMPApiDeleteDMPRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DMPApi(configuration);

const request: DMPApiDeleteDMPRequest = {
  
  id: "id_example",
};

const data = await apiInstance.deleteDMP(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | DMP deleted |  -  |
**401** | Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication.  |  -  |
**403** | Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP.  |  -  |
**404** | DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs.  |  -  |
**406** | The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header.  |  -  |
**409** | A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request.  |  -  |
**0** | The request failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDMP**
> DMPWithID getDMP()

Fetch a DMP based on its ID. 

### Example


```typescript
import { createConfiguration, DMPApi } from '';
import type { DMPApiGetDMPRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DMPApi(configuration);

const request: DMPApiGetDMPRequest = {
  
  id: "id_example",
};

const data = await apiInstance.getDMP(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | [**string**] |  | defaults to undefined


### Return type

**DMPWithID**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | DMP retrieved |  * Last-Modified - The server should expose the time the DMP was last modified to allow for a conditional PUT request. This is especially important if the server does not support PATCH requests.  <br>  |
**401** | Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication.  |  -  |
**403** | Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP.  |  -  |
**404** | DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs.  |  -  |
**406** | The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header.  |  -  |
**0** | The request failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listDMPs**
> DMPListResponseBody listDMPs()

This endpoint lists all DMPs or allows for creating a filtered list. When filters are provided, all filter are applied (AND relationship). For filters supporting lists, the individual values are applied as an OR relationship.  For items accepting more than one value you may pass multiple values by repeating the parameter in the query string for each item. 

### Example


```typescript
import { createConfiguration, DMPApi } from '';
import type { DMPApiListDMPsRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DMPApi(configuration);

const request: DMPApiListDMPsRequest = {
    // Number of items to skip from the start. (optional)
  offset: 0,
    // Number of items to fetch. (optional)
  count: 20,
    // A list of fields to sort by with the sort order.  (optional)
  sort: ["created,desc"],
  
  createdBefore: new Date('1970-01-01T00:00:00.00Z'),
  
  createdAfter: new Date('1970-01-01T00:00:00.00Z'),
  
  modifiedBefore: new Date('1970-01-01T00:00:00.00Z'),
  
  modifiedAfter: new Date('1970-01-01T00:00:00.00Z'),
  
  languages: [
    "aar",
  ],
  
  contactIds: [
    "contact_ids[]_example",
  ],
  
  contributorIds: [
    "contributor_ids[]_example",
  ],
  
  datasetIds: [
    "dataset_ids[]_example",
  ],
  
  metadataStandardIds: [
    "metadata_standard_ids[]_example",
  ],
  
  dmpIds: [
    "dmp_ids[]_example",
  ],
  
  funderIds: [
    "funder_ids[]_example",
  ],
  
  grantIds: [
    "grant_ids[]_example",
  ],
  
  query: "query_example",
  
  ethicalIssuesExist: true,
  
  embargoBefore: new Date('1970-01-01').toISOString().split('T')[0];,
  
  embargoAfter: new Date('1970-01-01').toISOString().split('T')[0];,
};

const data = await apiInstance.listDMPs(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **offset** | [**number**] | Number of items to skip from the start. | (optional) defaults to 0
 **count** | [**number**] | Number of items to fetch. | (optional) defaults to 20
 **sort** | **Array<&#39;title,asc&#39; &#124; &#39;title,desc&#39; &#124; &#39;created,asc&#39; &#124; &#39;created,desc&#39; &#124; &#39;modified,asc&#39; &#124; &#39;modified,desc&#39; &#124; &#39;language,asc&#39; &#124; &#39;language,desc&#39; &#124; &#39;embargo,asc&#39; &#124; &#39;embargo,desc&#39; &#124; &#39;keyword,asc&#39; &#124; &#39;keyword,desc&#39;>** | A list of fields to sort by with the sort order.  | (optional) defaults to undefined
 **createdBefore** | [**Date**] |  | (optional) defaults to undefined
 **createdAfter** | [**Date**] |  | (optional) defaults to undefined
 **modifiedBefore** | [**Date**] |  | (optional) defaults to undefined
 **modifiedAfter** | [**Date**] |  | (optional) defaults to undefined
 **languages** | **Array&lt;LanguageID&gt;** |  | (optional) defaults to undefined
 **contactIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **contributorIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **datasetIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **metadataStandardIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **dmpIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **funderIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **grantIds** | **Array&lt;string&gt;** |  | (optional) defaults to undefined
 **query** | [**string**] |  | (optional) defaults to undefined
 **ethicalIssuesExist** | [**boolean**] |  | (optional) defaults to undefined
 **embargoBefore** | [**string**] |  | (optional) defaults to undefined
 **embargoAfter** | [**string**] |  | (optional) defaults to undefined


### Return type

**DMPListResponseBody**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | A list of DMPs |  -  |
**400** | Bad request |  -  |
**401** | Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication.  |  -  |
**406** | The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header.  |  -  |
**0** | The request failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **putDMP**
> DMPWithID putDMP(dMPDocument)

Completely overwrite a DMP with the specified data. The server MUST honor the If-Unmodified-Since and IF-Match headers if present. 

### Example


```typescript
import { createConfiguration, DMPApi } from '';
import type { DMPApiPutDMPRequest } from '';

const configuration = createConfiguration();
const apiInstance = new DMPApi(configuration);

const request: DMPApiPutDMPRequest = {
  
  id: "id_example",
  
  dMPDocument: {
    dmp: {
      contact: {
        contactId: {
          identifier: "identifier_example",
          type: "orcid",
        },
        mbox: "mbox_example",
        name: "name_example",
      },
      contributor: [
        {
          contributorId: {
            identifier: "identifier_example",
            type: "orcid",
          },
          mbox: "mbox_example",
          name: "name_example",
          role: [
            "role_example",
          ],
        },
      ],
      cost: [
        {
          currencyCode: "AED",
          description: "description_example",
          title: "title_example",
          value: 3.14,
        },
      ],
      created: new Date('1970-01-01T00:00:00.00Z'),
      dataset: [
        {
          dataQualityAssurance: [
            "dataQualityAssurance_example",
          ],
          datasetId: {
            identifier: "identifier_example",
            type: "handle",
          },
          description: "description_example",
          distribution: [
            {
              accessUrl: "accessUrl_example",
              availableUntil: new Date('1970-01-01').toISOString().split('T')[0];,
              byteSize: 1,
              dataAccess: "open",
              description: "description_example",
              downloadUrl: "downloadUrl_example",
              format: [
                "format_example",
              ],
              host: {
                availability: "availability_example",
                backupFrequency: "backupFrequency_example",
                backupType: "backupType_example",
                certifiedWith: "din31644",
                description: "description_example",
                geoLocation: "AD",
                pidSystem: [
                  "ark",
                ],
                storageType: "storageType_example",
                supportVersioning: "yes",
                title: "title_example",
                url: "url_example",
              },
              license: [
                {
                  licenseRef: "licenseRef_example",
                  startDate: new Date('1970-01-01').toISOString().split('T')[0];,
                },
              ],
              title: "title_example",
            },
          ],
          isReused: true,
          issued: new Date('1970-01-01').toISOString().split('T')[0];,
          keyword: [
            "keyword_example",
          ],
          language: "aar",
          metadata: [
            {
              description: "description_example",
              language: "aar",
              metadataStandardId: {
                identifier: "identifier_example",
                type: "url",
              },
            },
          ],
          personalData: "yes",
          preservationStatement: "preservationStatement_example",
          securityAndPrivacy: [
            {
              description: "description_example",
              title: "title_example",
            },
          ],
          sensitiveData: "yes",
          technicalResource: [
            {
              description: "description_example",
              name: "name_example",
            },
          ],
          title: "title_example",
          type: "type_example",
        },
      ],
      description: "description_example",
      dmpId: {
        identifier: "identifier_example",
        type: "handle",
      },
      ethicalIssuesDescription: "ethicalIssuesDescription_example",
      ethicalIssuesExist: "yes",
      ethicalIssuesReport: "ethicalIssuesReport_example",
      language: "aar",
      modified: new Date('1970-01-01T00:00:00.00Z'),
      project: [
        {
          description: "description_example",
          end: new Date('1970-01-01').toISOString().split('T')[0];,
          funding: [
            {
              funderId: {
                identifier: "identifier_example",
                type: "fundref",
              },
              fundingStatus: "planned",
              grantId: {
                identifier: "identifier_example",
                type: "url",
              },
            },
          ],
          start: new Date('1970-01-01').toISOString().split('T')[0];,
          title: "title_example",
        },
      ],
      title: "title_example",
    },
  },
  
  ifUnmodifiedSince: new Date('1970-01-01T00:00:00.00Z'),
};

const data = await apiInstance.putDMP(request);
console.log('API called successfully. Returned data:', data);
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **dMPDocument** | **DMPDocument**|  |
 **id** | [**string**] |  | defaults to undefined
 **ifUnmodifiedSince** | [**Date**] |  | (optional) defaults to undefined


### Return type

**DMPWithID**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json
 - **Accept**: application/vnd.org.rd-alliance.dmp-common.v1.2+json, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | DMP modified |  * Last-Modified - The server should expose the time the DMP was last modified to allow for a conditional PUT request. This is especially important if the server does not support PATCH requests.  <br>  |
**400** | Bad request |  -  |
**401** | Authentication required to delete the DMP. The implementation should always return this error code for unauthenticated users as deletion always requires authentication.  |  -  |
**403** | Insufficient permissions to delete the specified a DMP. Note: the implementation may opt to return a 404 instead to avoid leaking information about the existence of a DMP with the specified ID if the user has no permissions to at least view this DMP. The implementation SHOULD return this error code if the user has at least read permissions for this DMP.  |  -  |
**404** | DMP not found or not enough permissions to delete the specified DMP. Security note: implementations may return this error code even if the DMP exists but the authenticated user has no permissions to view it in order to avoid leaking information about the existence of a DMP. This may especially be important if the DMP tool uses numeric IDs to avoid enabling an enumeration of possible DMP IDs.  |  -  |
**406** | The server cannot produce a response that the client requested in its &#x60;Accept&#x60; header.  |  -  |
**409** | A precondition specified in the If-Unmodified-Since or If-Match header cannot be fulfilled. The client should apply the modifications again and resubmit the request.  |  -  |
**415** | The server cannot process the request the client because it does not support the DMP standard the client sent the document in.  |  -  |
**0** | The request failed |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


