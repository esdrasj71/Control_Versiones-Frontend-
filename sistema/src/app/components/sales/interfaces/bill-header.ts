export interface Bill_header {
   Bill_header_Id?: number;
   Correlative_Number: string;
   Serie: string;
   Date: string;
   Total: number;
   Refund: number;
   Annulment_State: number;
   Payment_Complete: boolean;
   Customers_Id: number;
   Employee_Id: number;
}