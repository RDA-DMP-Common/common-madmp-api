# Common maDMP API

> [!WARNING]
> This is an initial work in progress and the API is subject to change.

## Abstract

This API provides a common baseline standard for exchanging Data Management Plans among compliant platforms. The API specification is based on the work of the [Common maDMP Standard](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard).

## Web-Based Validator & Diff Tool

A client-side web application for validating and comparing maDMP documents is available on the **`webdiff` branch**. This tool provides:

- **Validation**: Check maDMP JSON against schema v1.2
- **Comparison**: Compare different versions with multiple visualization formats
- **API Integration**: Test integration with common-madmp-api endpoints
- **Export**: Generate reports in JSON, HTML, PDF, CSV, and Markdown formats

**Quick Access:**
- **Online Demo**: [xrzhou.com/webdiff](https://xrzhou.com/webdiff)
- **Branch**: `git checkout webdiff` (see [webdiff/README.md](../../tree/webdiff/webdiff/README.md) for details)
- **GitHub Pages**: Deployable via gh-pages branch or GitHub Actions

This tool complements the API specification by providing an interactive way to validate and visualize maDMP documents.

## Implementing this API

We provide an [OpenAPI document](openapi.yaml) suitable for automatic code generation. You can generate both client and server libraries with it. While any OpenAPI 3.1-compliant generator may work, we have a good track record with [this generator](https://openapi-generator.tech/).

Please note the following two implementation concerns:

1. This API is built for extensibility. Your server and client implementations must support content negotiation using the `Accept` header.
2. The `PUT` API supports conditional uploads to manage conflicts. Your server implementation must support the `If-Unmodified-Since` header.

To view the full documentation, [see this link](https://rda-dmp-common.github.io/common-madmp-api/).

## License

This work is licensed under the Creative Commons Zero (CC0) license. See [LICENSE](LICENSE) for more information.
