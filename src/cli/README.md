# Generating clients

## Typescript

To generate a stub API client for the common-madmp-api

```shell
docker run --rm -v ${PWD}/:/local openapitools/openapi-generator-cli generate \
    -i https://raw.githubusercontent.com/RDA-DMP-Common/common-madmp-api/refs/heads/init/openapi.yaml \
    -g typescript \
    -o /local/typescript \
    --additional-properties=enumClassPrefix=true,generateInterfaces=true,supportDiscriminator=false
```
