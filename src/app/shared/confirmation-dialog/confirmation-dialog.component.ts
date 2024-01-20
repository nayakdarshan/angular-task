import { Component, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
  @Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
  standalone:true,
  imports:[MatDialogModule],
})
export class ConfirmationDialogComponent {
@Input() groupName:any;
}
