import { ApiResponse, IApi } from "yuni-chanz-react";

export default abstract class FirebaseApi<T = any> implements IApi<T> {
    
    abstract request(): Promise<ApiResponse<T>>;
}