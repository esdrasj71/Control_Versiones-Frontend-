export interface Bill_header {
   Bill_header_Id?: number;
   Correlative_Number: number;
   Date: string;
   Total: number;
   Payment_Complete: boolean;
   Customers_Id: number;
   Employee_Id: number;
   Serie_Id: number;
}