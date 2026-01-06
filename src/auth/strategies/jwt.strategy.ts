import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksClient from 'jwks-rsa';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private jwksClient: jwksClient.JwksClient;

  constructor() {
    const auth0Domain = process.env.AUTH0_DOMAIN;
    const auth0Audience = process.env.AUTH0_AUDIENCE;

    if (!auth0Domain) {
      throw new Error('AUTH0_DOMAIN environment variable is required');
    }
    if (!auth0Audience) {
      throw new Error('AUTH0_AUDIENCE environment variable is required');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async (request, rawJwtToken, done) => {
        try {
          const key = await this.getSigningKey(rawJwtToken);
          done(null, key);
        } catch (error) {
          done(error);
        }
      },
      issuer: `https://${auth0Domain}/`,
      algorithms: ['RS256'],
    });

    this.jwksClient = jwksClient.default({
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 10 * 60 * 1000, // 10 minutes
      jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
    });
  }

  private async getSigningKey(token: string): Promise<string> {
    const decoded = jwtDecode<any>(token, { header: true });
    const kid = decoded.header?.kid || decoded.kid;

    if (!kid) {
      throw new Error('Unable to find a signing key that matches');
    }

    try {
      const signingKey = await this.jwksClient.getSigningKey(kid);
      return signingKey.getPublicKey();
    } catch (error) {
      throw new Error('Unable to find a signing key that matches');
    }
  }

  validate(payload: any) {
    const expectedAudience = process.env.AUTH0_AUDIENCE;

    // Handle audience as either string or array
    const tokenAudiences = Array.isArray(payload.aud)
      ? payload.aud
      : [payload.aud];

    if (!tokenAudiences.includes(expectedAudience)) {
      throw new Error(
        `Invalid audience. Expected: ${expectedAudience}, got: ${tokenAudiences.join(', ')}`,
      );
    }

    return {
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
      scope: payload.scope,
    };
  }
}
