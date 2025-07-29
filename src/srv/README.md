# Generating server stubs

## Typescript

There is no single openAPI generator out there that will generate server stubs, so we use a combination of several code generators and some manual intervention to create them.

### Generate the Typescript types and interfaces
Generate the initial Typescript interfaces from the OpenAPI spec using [openapi-typescript](https://github.com/openapi-ts/openapi-typescript/tree/main/packages/openapi-typescript)
1. Run `npm i -D openapi-typescript typescript`
2. Install other dependencies `npm add express zod validation-adapters --save`
3. Install dev dependencies `npm install @types/node @types/express ts-node tsconfig-paths nodemon --save-dev`
4. Manually update `tsconfig.json` as described (use “NodeNext”)
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "noUncheckedIndexedAccess": true
  }
}
```
5. Generate the code `npx openapi-typescript ../../../openapi.yaml -o ./src/gen/v1/schema.ts`

This generates the `src/gen/v1/schema.ts` file

### Generate Zod schemas 

We use [Zod](https://zod.dev/) to help us easily parse and validate JSON schemas.

Use [Orval](https://orval.dev/guides/zod) to generate Zod schemas from the OpenAPI spec. 
1. Run `npm I -D -g orval`
2. Add the other dependencies `npm add @faker-js/faker msw --save`
3. Manually create an `orval.config.js` file
```js
module.exports = {
  'madmp-transformer': {
    output: {
      mode: 'single',
      client: 'zod',
      target: './src/schema.ts',
      schemas: './src/schemas',
      mock: true,
    },
    input: {
      target: '../../../openapi.yaml',
    },
  },
};
```
4. Generate the Zod schemas `orval --config orval.config.js`

This creates the `src/schema.ts` file and all of the Zod schemas in `src/schemas/*.ts`

### Create an express router

We need to create an express router that can be used to handle requests to the API.

Generate an initial Express router file using [openapi-ts-router](https://www.npmjs.com/package/openapi-ts-router)
1. Run `npm add openapi-ts-router --save`
2. Manually create an root `src/index.ts` entry point (based on [their examples](https://github.com/builder-group/community/blob/develop/examples/openapi-ts-router/express/petstore/src/schemas.ts)):
```ts
import express from 'express';
import { errorMiddleware, invalidPathMiddleware } from './middlewares';
import { router } from './router';

const app = express();
const port = 3000;

app.use(express.json());

app.use(router);

app.use(invalidPathMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port.toString()}`);
});
```
3. Manually create a `src/types.ts` file to compensate for the fact that openapi-ts-router doesn't export all of the necessary types:
```ts
export type TOperationResponseContent<
  TOperation extends { responses: Record<number | string, unknown> },
  TStatus extends keyof TOperation['responses']
> = TOperation['responses'][TStatus] extends { content: infer Content }
  ? Content extends Record<string, unknown>
    ? Content[keyof Content] // Handle multiple content types
    : Content
  : TOperation['responses'][TStatus] extends void
    ? void
    : TOperation['responses'][TStatus] extends null | undefined
      ? null
      : never;
```
4. Manually create the middleware helper files:
```ts
// src/middlewares/index.ts

export * from './error-middleware';
export * from './invalid-path-middleware';


// src/middlewares/error-middleware.ts

import type express from 'express';
import { AppError } from 'openapi-ts-router';
import { type components } from '../gen/v1/schema';

export function errorMiddleware(
  err: unknown,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
): void {
  let statusCode = 500;
  const jsonResponse: components['schemas']['Error'] = {
    error_code: '#ERR_UNKNOWN',
    error_message: null,
  };

  // Handle application-specific errors (instances of AppError)
  if (err instanceof AppError) {
    statusCode = err.status;
    jsonResponse.error_code = err.code;
  }

  // Handle unknown errors
  else if (typeof err === 'object' && err != null) {
    if ('message' in err && typeof err.message === 'string') {
      jsonResponse.error_message = err.message;
    }
    if ('code' in err && typeof err.code === 'string') {
      jsonResponse.error_code = err.code;
    }
  } else {
    jsonResponse.error_message = 'An unknown error occurred!';
  }

  res.status(statusCode).json(jsonResponse);
}


// src/middlewares/invalid-path-middleware.ts

import type express from 'express';
import { AppError } from 'openapi-ts-router';

export function invalidPathMiddleware(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void {
  next(
    new AppError('#ERR_PATH_NOT_FOUND', 404, {
      description: `The specified path '${req.path}' does not exist!`
    })
  );
}
```
5. Manually create the `src/router.ts` file:
```ts
import { Router } from 'express';
import { createExpressOpenApiRouter } from 'openapi-ts-router';
import { zValidator } from 'validation-adapters/zod';
import * as z from 'zod';
import { paths } from './gen/v1/schema'; // OpenAPI-generated types
import { TOperationResponseContent } from './types';
import { mockDMP } from "./mocks/dmps";
import { getDMPResponse } from './schema'; // Custom reusable schema for validation

export const router: Router = Router();
export const openApiRouter = createExpressOpenApiRouter<paths>(router);

// GET /dmps/{id}
openApiRouter.get('/dmps/{id}', {
  pathValidator: zValidator(
    z.object({
      id: z.string()
    })
  ),
  handler: (req, res) => {
    const { id } = req.valid.params; // Access parsed & validated params

    const mockResponse = getDMPResponse.parse({ dmp: mockDMP });
    res.send(mockResponse);
    res.status(200).send({
      id: '123'
    } satisfies TOperationResponseContent<paths['/dmps/{id}']['get'], 200>);
  }
});

// TypeScript will error if route/method doesn't exist in OpenAPI spec
// or if response doesn't match defined schema
```
