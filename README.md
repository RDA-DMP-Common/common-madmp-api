# Common maDMP API

API specification for Machine-Actionable Data Management Plans (maDMPs).

This repository defines a common baseline API for exchanging Data Management Plans across platforms. The specification is based on the [RDA DMP Common Standard for maDMPs](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).

## Repository contents

- [openapi.yaml](openapi.yaml): canonical OpenAPI 3.1 specification
- [bin/swagger-ui.sh](bin/swagger-ui.sh): builds static Swagger UI assets
- `dist/`: generated Swagger UI output
- [CHANGELOG.md](CHANGELOG.md): notable changes in Keep a Changelog format
- [CONTRIBUTING.md](CONTRIBUTING.md): contribution workflow and checks

## API at a glance

Current endpoints:

- `GET /dmps`: list/search DMPs
- `POST /dmps`: create a DMP
- `GET /dmps/{id}`: fetch a DMP
- `PUT /dmps/{id}`: overwrite a DMP
- `DELETE /dmps/{id}`: delete a DMP

Published docs: [rda-dmp-common.github.io/common-madmp-api](https://rda-dmp-common.github.io/common-madmp-api/)

## Implementing clients and servers

You can use [openapi.yaml](openapi.yaml) to generate or hand-implement clients and servers. Any OpenAPI 3.1-compatible tooling should work. We have had good results with [OpenAPI Generator](https://openapi-generator.tech/).

### Code generation examples

Generate a TypeScript client:

```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g typescript-fetch \
  -o generated/typescript-client
```

Generate a Python FastAPI server stub:

```bash
openapi-generator-cli generate \
  -i openapi.yaml \
  -g python-fastapi \
  -o generated/python-server
```

### Required behavior

1. Content negotiation with `Accept`: client and server implementations must support media-type negotiation, including the standard media type `application/vnd.org.rd-alliance.dmp-common.v1.2+json`.
2. Conditional updates on `PUT /dmps/{id}`: server implementations must support `If-Unmodified-Since` and return conflicts (`409`) when preconditions fail.
3. `Last-Modified` propagation: servers should return `Last-Modified` on DMP reads/writes so clients can perform safe conditional updates.

### Recommendations

#### API discovery

Implementations should publish an [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727.html) API catalog at:

```http
GET /.well-known/api-catalog
```

This catalog is deployment-level discovery metadata, so it is not modeled directly in [openapi.yaml](openapi.yaml). It allows each institution to choose its own maDMP API base URL, publish local extensions, and still provide a standard discovery entry point for clients.

The response should use the Linkset JSON format:

```http
Content-Type: application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"
```

At minimum, the catalog should link from the catalog URI to the maDMP API base URL. Where possible, it should also include `service-desc` links to the deployment-specific OpenAPI description and to this repository's common baseline specification:

```json
{
  "linkset": [
    {
      "anchor": "https://example.org/.well-known/api-catalog",
      "item": [
        { "href": "https://api.example.org/madmp" },
        { "href": "https://api.example.org/custom" }
      ]
    },
    {
      "anchor": "https://api.example.org/madmp",
      "service-desc": [
        {
          "href": "https://api.example.org/madmp/openapi.yaml",
          "type": "application/vnd.oai.openapi"
        },
        {
          "href": "https://raw.githubusercontent.com/RDA-DMP-Common/common-madmp-api/refs/heads/init/openapi.yaml",
          "type": "application/vnd.oai.openapi"
        }
      ]
    },
    {
      "anchor": "https://api.example.org/custom",
      "service-desc": [
        {
          "href": "https://api.example.org/custom/openapi.yaml",
          "type": "application/vnd.oai.openapi"
        }
      ]
    }
  ]
}
```

Servers should also support `HEAD /.well-known/api-catalog` and return a `Link` header with the `api-catalog` relation. If the same API catalog is reachable on multiple domains, choose one canonical catalog URI and redirect the others to it.

### HTTP examples

Fetch a DMP with explicit content negotiation:

```bash
curl -i \
  -H "Accept: application/vnd.org.rd-alliance.dmp-common.v1.2+json" \
  "https://example.org/dmps/123"
```

Update safely with `If-Unmodified-Since`:

```bash
curl -i -X PUT \
  -H "Accept: application/vnd.org.rd-alliance.dmp-common.v1.2+json" \
  -H "Content-Type: application/vnd.org.rd-alliance.dmp-common.v1.2+json" \
  -H "If-Unmodified-Since: Tue, 25 Mar 2025 14:13:00 GMT" \
  --data @dmp.json \
  "https://example.org/dmps/123"
```

### Authentication

Authentication and authorization are intentionally out of scope in this specification. Implementers should apply an appropriate mechanism for their environment, for example OAuth 2.0 or API keys/Bearer tokens in the `Authorization` header.

## Changelog

This project keeps a human-readable changelog in [CHANGELOG.md](CHANGELOG.md), based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request or otherwise contributing to this repository.

## License

This work is licensed under the Creative Commons Zero (CC0) license. See [LICENSE](LICENSE) for more information.
