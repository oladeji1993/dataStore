import { Gender } from "./enum";

export class CustomerModel{
    id!: number;
    name!: string;
    age!: Date;
    gender!: Gender;
    address!: {
        Street: string,
        Postcode: string,
        HouseNumber: number
    }[]
    order!: Order[];


}

class Order {
    OrderId! : string;
    OrderDate!: Date;
    Amount!: number;
}