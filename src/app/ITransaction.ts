export interface ITransaction{
    amount: number,
    created: Date,
    id: number,
    transactionType: string;
    user: string,
    userId: string;
}