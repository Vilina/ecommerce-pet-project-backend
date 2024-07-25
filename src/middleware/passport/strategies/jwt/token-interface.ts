export interface IToken {
    type: ITokenType,
    userId: number,
}

export enum ITokenType {
    acceess = 'access',
    refresh = 'refresh'
}