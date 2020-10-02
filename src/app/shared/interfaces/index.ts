export declare type STATUS = 'success' | 'warning' | 'error' | 'info';

export interface Respuesta<T> {
    status: STATUS;
    message: string;
    icon: string;
    data: T;
}


export interface APIResponse {
    status: STATUS;
    message: string;
    icon: string;
    data: any;
}


export interface IToken<T> {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    user: T;
}
