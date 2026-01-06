import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const auth0Domain = process.env.AUTH0_DOMAIN;
        const auth0Audience = process.env.AUTH0_AUDIENCE;

        if (!auth0Domain || !auth0Audience) {
          return done(
            new Error(
              'AUTH0_DOMAIN and AUTH0_AUDIENCE environment variables are required',
            ),
          );
        }

        // For Auth0, you typically verify using their public key
        // This is a simplified example using the domain
        done(null, Buffer.from(process.env.AUTH0_SECRET || '', 'base64'));
      },
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      scope: payload.scope,
    };
  }
}
