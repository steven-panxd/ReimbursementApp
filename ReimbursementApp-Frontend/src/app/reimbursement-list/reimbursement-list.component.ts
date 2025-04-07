import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reimbursement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.scss']
})
export class ReimbursementListComponent implements OnInit {
  reimbursements: ReimbursementRecord[] = [];

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number): void {
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    const pageData = MOCK_DATA.slice(start, end);
    this.reimbursements = pageData;

    this.totalPages = Math.ceil(MOCK_DATA.length / this.pageSize);
    this.currentPage = page;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadPage(page);
    }
  }
}

interface ReimbursementRecord {
  name: string;
  iowaId: string;
  date: string;
  amount: number;
  description: string;
  receiptUrl: string;
}

// ✅ 假数据（你可以多加几条测试分页）
const MOCK_DATA: ReimbursementRecord[] = [
  {
    name: 'Alice Johnson',
    iowaId: '12345678',
    date: '2024-04-01',
    amount: 145.75,
    description: 'Conference travel to Chicago',
    receiptUrl: '#',
  },
  {
    name: 'Bob Smith',
    iowaId: '87654321',
    date: '2024-04-03',
    amount: 68.00,
    description: 'Office supplies',
    receiptUrl: '#'
  },
  {
    name: 'Charlie Brown',
    iowaId: '11223344',
    date: '2024-04-05',
    amount: 22.50,
    description: 'Printing costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting costPrinting cost',
    receiptUrl: '#'
  },
  {
    name: 'Diana Prince',
    iowaId: '99887766',
    date: '2024-04-07',
    amount: 300.00,
    description: 'Hotel stay for workshop',
    receiptUrl: '#'
  },
  {
    name: 'Ethan Lee',
    iowaId: '33445566',
    date: '2024-04-09',
    amount: 49.99,
    description: 'Webinar registration',
    receiptUrl: '#'
  },
  {
    name: 'Fiona Wang',
    iowaId: '22334455',
    date: '2024-04-10',
    amount: 77.77,
    description: 'Project materials',
    receiptUrl: '#'
  },
  {
    name: 'George Miller',
    iowaId: '66778899',
    date: '2024-04-11',
    amount: 89.00,
    description: 'Lunch meeting',
    receiptUrl: '#'
  }
];
