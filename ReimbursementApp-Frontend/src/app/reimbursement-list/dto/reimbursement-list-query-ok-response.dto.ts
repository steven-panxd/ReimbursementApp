export interface ReimbursementListQueryOKResponseItemDTO {
    id: number;
    requesterName: string;
    requesterId: string;
    purchaseDate: Date;
    amount: number;
    receiptUrl: string;
    description: string;
    createdAt: Date;
}

export interface ReimbursementListQueryOKResponseDTO {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    records: ReimbursementListQueryOKResponseItemDTO[]
}