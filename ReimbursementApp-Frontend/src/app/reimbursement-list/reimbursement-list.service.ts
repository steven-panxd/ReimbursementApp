import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReimbursementListQueryDTO } from './dto/reimbursement-list-query.dto';
import { ReimbursementListQueryOKResponseDTO } from './dto/reimbursement-list-query-ok-response.dto';

@Injectable({ providedIn: 'root' })
export class ReimbursementListService {
  private readonly apiUrl = '/api/reimbursement';

  constructor(private http: HttpClient) {}

  get(dto: ReimbursementListQueryDTO): Observable<ReimbursementListQueryOKResponseDTO> {
    const Page = dto.Page;
    const PageSize = dto.PageSize;
    return this.http.get<ReimbursementListQueryOKResponseDTO>(this.apiUrl + `?Page=${Page}&PageSize=${PageSize}`);
  }
}
