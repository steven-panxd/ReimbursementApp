export interface ReimbursementFormRequestDTO {
    RequesterName: string;
    RequesterId: string;
    PurchaseDate: string;
    Amount: string;
    Description: string;
    Receipt: File;
  }