import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReimbursementListService } from './reimbursement-list.service';
import { ReimbursementListQueryDTO } from './dto/reimbursement-list-query.dto';
import {
  ReimbursementListQueryOKResponseItemDTO,
} from './dto/reimbursement-list-query-ok-response.dto';
import { finalize } from 'rxjs';
import { LoadingMaskComponent } from '../shared/loading-mask/loading-mask.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-reimbursement-list',
  standalone: true,
  imports: [CommonModule, LoadingMaskComponent, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.scss'],
})
export class ReimbursementListComponent implements OnInit {
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;
  loading = false;
  data: ReimbursementListQueryOKResponseItemDTO[] = [];

  constructor(private reimbursementListService: ReimbursementListService) {}

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    this.loading = true;

    // construct request DTO
    const dto: ReimbursementListQueryDTO = {
      Page: this.currentPage,
      PageSize: this.pageSize
    }

    this.reimbursementListService
      .get(dto)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (res) => {
          this.currentPage = res.page;
          this.pageSize = res.pageSize;
          this.totalPages = res.totalPages;
          this.totalCount = res.totalCount;
          this.data = res.records;
        },
        error: (err) => {
          console.log("Error: " + err);
        }
      });
  }

  goToPage(page: number): void {
    // do nothing if page does not change
    if (page == this.currentPage) {
      return;
    }

    // do nothing is page is invalid
    if (page <= 1 && page > this.totalPages) {
      return;
    }

    // switch to page
    this.currentPage = page;
    this.loadPage(this.currentPage);
  }
}
