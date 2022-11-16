module.exports = {
  'swagger-api': {
    input: `./swagger.json`,
    // input: `https://dev.heqsapp.com/docs/api-docs.json`,
    output: {
      target: './packages/heqs-ui-app/src/features/api/generated/endpoints.ts',
      schemas: './packages/heqs-ui-app/src/features/api/generated/models',
      client: 'react-query'
    }
  }
}
