import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReimbursementFormRequestDTO } from './dto/reimbursement-form-request.dto';
import { ReimbursementFormRequestOkResponseDTO } from './dto/reimbursement-form-request-ok-response.dto';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReimbursementFormService {
  private readonly apiUrl = '/api/reimbursement';

  constructor(private http: HttpClient) {}

  submit(dto: ReimbursementFormRequestDTO): Observable<ReimbursementFormRequestOkResponseDTO> {
    const formData = new FormData();
    formData.append('RequesterName', dto.RequesterName);
    formData.append('RequesterId', dto.RequesterId);
    formData.append('PurchaseDate', dto.PurchaseDate);
    formData.append('Amount', dto.Amount);
    formData.append('Description', dto.Description);
    formData.append('Receipt', dto.Receipt);

    return this.http.post<ReimbursementFormRequestOkResponseDTO>(this.apiUrl, formData);
  }
}
