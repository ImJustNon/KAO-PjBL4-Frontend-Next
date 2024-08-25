export type ResponseStatus = "FAIL" | "OK";

export interface RegisterResponse {
    status: ResponseStatus;
    message: string;
    error?: any;
    data?: any;
}