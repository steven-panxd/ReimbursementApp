export interface ReimbursementFormRequestErrorResponseItemDTO {
    field: string;
    errorMessage: string[];
}

export interface ReimbursementFormRequestErrorResponseDTO {
    message: string;
    errors: ReimbursementFormRequestErrorResponseItemDTO[];
}