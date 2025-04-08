import { Routes } from '@angular/router';
import { ReimbursementFormComponent } from './reimbursement-form/reimbursement-form.component';
import { ReimbursementListComponent } from './reimbursement-list/reimbursement-list.component';

export const routes: Routes = [
  { path: '', component: ReimbursementFormComponent },
  { path: 'list', component: ReimbursementListComponent }
];
