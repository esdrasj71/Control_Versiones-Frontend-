export interface Purchase_Header{
    Purchase_Header_Id?: number;
    Correlative_Number: string;
    Serie:string;
    Date_Purchase:Date;
    Total:number;
    Payment_Complete:number;
    Observations:string;
    Providers_Id:string;
}