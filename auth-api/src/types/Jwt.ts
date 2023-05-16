export type TokenType = 'ACCESS' | 'REFRESH';

export interface TokenData {
  id: number;
  email: string;
  type: TokenType;
}

export interface ApiAuthTokens {
  accessToken: string;
  refreshToken: string;
}
