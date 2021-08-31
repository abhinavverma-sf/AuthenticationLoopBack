import {UserProfile} from '@loopback/security';
import {promisify} from 'util';
const jwt = require('jsonwebtoken');
import {HttpErrors} from '@loopback/rest';
import {inject} from '@loopback/core';
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);
import {
  UserServiceBindings,
  PasswordHasherBindings,
  TokenServiceBindings,
} from '../keys';

export class JWTService {
  @inject(TokenServiceBindings.TOKEN_SECRET)
  public jwtSecret: string;
  @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
  public jwtExpiresIn: string;

  async generateToken(userProfile: UserProfile): Promise<String> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized(
        'Error while generating token: User Profile is null',
      );
    }
    let token = '';
    try {
      token = signAsync(userProfile, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn,
      });
    } catch (err) {
      throw new HttpErrors.Unauthorized(`Error while generating token: ${err}`);
    }
    return token;
  }
  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token:'token' is null`,
      );
    }

    let userProfile: UserProfile;
    try {
      const decryptedToken = await verifyAsync(token, this.jwtSecret);
      userProfile=decryptedToken;
      
      
      
    } catch (err) {
      throw new HttpErrors.Unauthorized(`Error verifying token:${err.message}`);
    }
    return userProfile;
  }
}
