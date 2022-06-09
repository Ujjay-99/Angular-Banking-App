import { IUserRegister } from "./IUserRegister";

export interface ITransaction{
    amount: number,
    created: string,
    id: number,
    transactionType: string;
    user: IUserRegister,
    userId: string;
}
// export interface ITransaction{
//     amount: number
//     created: string
//     id: number
//     transactionType: string
//     userId: string
// }