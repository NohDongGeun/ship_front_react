export interface IError {
    error: string;
    status: number;
    message: string | null;
}

export interface IErrorResponse {
    message: string;
    status: number;
    error: string;
}
