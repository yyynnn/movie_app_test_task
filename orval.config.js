module.exports = {
  'swagger-api': {
    // input: `./swagger.json`,
    input: `https://heqs-services-dev.onrender.com/docs/api-docs.json`,
    output: {
      target: './packages/heqs-ui-app/src/features/api/generated/endpoints.ts',
      schemas: './packages/heqs-ui-app/src/features/api/generated/models',
      client: 'react-query'
    }
  }
}
