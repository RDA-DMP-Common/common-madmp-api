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
