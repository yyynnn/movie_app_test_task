module.exports = {
  'swagger-api': {
    // input: `./swagger.json`,
    input: `/docs/api-docs.json`,
    output: {
      target: './packages/movie-app/src/features/api/generated/endpoints.ts',
      schemas: './packages/movie-app/src/features/api/generated/models',
      client: 'react-query'
    }
  }
}
