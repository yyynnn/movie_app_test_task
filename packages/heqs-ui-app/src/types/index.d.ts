export type JWTReturn = {
  header: {
    typ: string
    alg: string
  }
  payload: {
    aud: string
    jti: string
    iat: number
    nbf: number
    exp: number
    sub: string
    scopes: never[]
  }
  signature: string
}
