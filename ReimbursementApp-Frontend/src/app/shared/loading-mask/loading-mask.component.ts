import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-mask',
  templateUrl: './loading-mask.component.html',
  imports: [CommonModule]
})
export class LoadingMaskComponent {
  @Input() visible: boolean = false;
  @Input() title: string = 'Submitting your request...';
  @Input() message: string = 'Please do not refresh or close the page.';
}
