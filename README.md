# Common maDMP API

> [!WARNING]  
> This is an initial work in progress and the API is subject to change.

*TODO: badges*

## Overview

*TODO: some basic description*

## Contributing

Recommended way how to develop and test the API is to use the [Swagger Editor](https://swagger.io/tools/swagger-editor/):

```
docker run -d -p 80:8080 -v ./openapi.yaml:/tmp/openapi.yaml -e SWAGGER_FILE=/tmp/openapi.yaml docker.swagger.io/swaggerapi/swagger-editor
```

Alternatively, you can take advantage of OpenAPI extensions/plugins for your favorite IDEs, such as [OpenAPI Specifications for IntelliJ](https://plugins.jetbrains.com/plugin/14394-openapi-specifications).

*TODO: contributing guidelines*

## License

This work is licensed under the Creative Commons Zero (CC0) license. See [LICENSE](LICENSE) for more information.
