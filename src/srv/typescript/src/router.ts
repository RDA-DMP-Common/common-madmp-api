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
