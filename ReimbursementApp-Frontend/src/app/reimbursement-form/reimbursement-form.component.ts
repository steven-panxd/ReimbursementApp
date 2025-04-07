import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reimbursement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reimbursement-form.component.html',
  styleUrls: ['./reimbursement-form.component.scss']
})
export class ReimbursementFormComponent {
  form: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      iowaId: ['', [Validators.required]],
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
      receipt: [null, [Validators.required]]
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ receipt: this.selectedFile });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      for (const key in this.form.value) {
        formData.append(key, this.form.value[key]);
      }

      console.log('Form Data:', this.form.value);
      console.log('File:', this.selectedFile);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
