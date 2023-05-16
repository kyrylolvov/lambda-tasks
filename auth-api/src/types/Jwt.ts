export type TokenType = 'ACCESS' | 'REFRESH';

export interface TokenData {
  id: number;
  email: string;
  type: TokenType;
}
