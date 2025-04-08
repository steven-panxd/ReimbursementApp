import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReimbursementFormService } from './reimbursement-form.service';
import { ReimbursementFormRequestDTO } from './dto/reimbursement-form-request.dto';
import { ReimbursementFormRequestErrorResponseDTO } from './dto/reimbursement-form-request-error-response.dto';
import { finalize } from 'rxjs';
import { LoadingMaskComponent } from '../shared/loading-mask/loading-mask.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../shared/footer/footer.component';
import { HeaderComponent } from '../shared/header/header.component';

@Component({
  selector: 'app-reimbursement-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingMaskComponent, RouterModule, FooterComponent, HeaderComponent],
  templateUrl: './reimbursement-form.component.html',
  styleUrls: ['./reimbursement-form.component.scss']
})
export class ReimbursementFormComponent {
  form: FormGroup;
  service: ReimbursementFormService;
  loading: boolean;
  @ViewChild('receipt') private receiptFileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private reimbursementFormService: ReimbursementFormService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      iowaId: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      date: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]],
      receipt: [null, [Validators.required, fileValidator(["pdf", "jpg", "jpeg", "png"], 5)]]
    });

    this.service = reimbursementFormService;
    this.loading = false;
  }

  getError(fieldName: string): string | null {
    const formField = this.form.get(fieldName);
    if (!formField || !formField.errors || !formField.touched) return null;
  
    const errors = formField.errors;
  
    if (errors['server']) return errors['server']; // error message from backend
    // below are error messages from frontend Angular Validators
    if (errors['required']) return `"${ fieldName }" field is required.`;
    if (errors['minlength']) return `Minimum length is ${errors['minlength'].requiredLength}.`;
    if (errors['maxlength']) return `Maximum length is ${errors['maxlength'].requiredLength}.`;
    if (errors['invalidExtension']) return `Only ${errors['invalidExtension'].allowed.join(', ').toUpperCase()} files are allowed.`;
    if (errors['fileTooLarge']) return `File too large. Max size is ${errors['fileTooLarge'].maxSizeMB}MB.`; 

    return 'Invalid input.';
  }
  

  // we only want 2 decimal places for Amount
  onAmountBlured(event: Event): void {
    const value = this.form.get('amount')?.value;
    if (value !== null && value !== '') {
      const formatted = parseFloat(value).toFixed(2);
      this.form.get('amount')?.setValue(formatted);
    }
  }

  // update receipt file value in the form
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    // set file value to receipt in this.form
    this.form.patchValue({ receipt: input.files && input.files.length > 0 ? input.files[0] : null  });
    // trigger fileValidator
    this.form.get('receipt')?.markAsTouched();
    this.form.get('receipt')?.updateValueAndValidity();
  }

  // map error messages from backend to frontend form
  private mapServerFieldToFormField(field: string): string {
    const map: Record<string, string> = {
      RequesterName: 'name',
      RequesterId: 'iowaId',
      PurchaseDate: 'date',
      Amount: 'amount',
      Description: 'description',
      Receipt: 'receipt'
    };
    return map[field] ?? field;
  }

  private applyServerErrors(dto: ReimbursementFormRequestErrorResponseDTO): void {
    dto.errors.forEach(err => {
      const formFieldName = this.mapServerFieldToFormField(err.field);
      const control = this.form.get(formFieldName);
      if (control) {
        control.setErrors({ server: err.errorMessage[0] });
      }
    });
  }

  // submit form
  onSubmit(): void {
    // stop if not all parameters are valid
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    // construct request dto
    const dto: ReimbursementFormRequestDTO = {
      RequesterName: this.form.value.name,
      RequesterId: this.form.value.iowaId,
      PurchaseDate: this.form.value.date,
      Amount: this.form.value.amount,
      Description: this.form.value.description,
      Receipt: this.form.value.receipt
    };

    // send out request to backend
    this.reimbursementFormService.submit(dto).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (res) => {
        alert(`Your reimbursement request has been submitted, for your information, your request id is ${ res.ReimbursementId }.`);
        this.onClear();
      },
      error: (err) => {
        const errorDto = err.error as ReimbursementFormRequestErrorResponseDTO;
        if (errorDto?.errors?.length) {
          this.applyServerErrors(errorDto);
        }
      }
    });
  }

  // clear form
  onClear(): void {
      this.form.reset();
      this.receiptFileInput.nativeElement.value = '';
  }

}


// Custom File Validator for receipt
function fileValidator(allowedExtensions: string[], maxSizeMB: number = 5): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File;

    // pass to Required if file is null
    if (!file) return null;

    const extension = file.name.split('.').pop()?.toLowerCase();
    const isValidExtension = extension && allowedExtensions.includes(extension);
    const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

    
    const errors: ValidationErrors = {};

    // only accept selected extensions
    if (!isValidExtension) {
      errors['invalidExtension'] = {
        allowed: allowedExtensions,
        actual: extension
      };
    }

    // only accept files below a specific size
    if (!isValidSize) {
      errors['fileTooLarge'] = {
        maxSizeMB,
        actualSizeMB: +(file.size / (1024 * 1024)).toFixed(2)
      };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };
}

