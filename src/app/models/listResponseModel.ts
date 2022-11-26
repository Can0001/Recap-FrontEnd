import { ResponseModel } from "./responseModul";

export interface ListResponseModel<T> extends ResponseModel{
    data:T[];
}