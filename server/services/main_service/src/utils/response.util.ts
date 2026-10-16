export interface IResponse<T> {
    success:boolean,
    message:string,
    result?:T
}