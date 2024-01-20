import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from './service/api.service';
// import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { ChangeApiDialogComponent } from './change-api-dialog/change-api-dialog.component';

@NgModule({
  declarations: [
    
  
    
  
    SnackbarComponent,
                    ChangeApiDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule
    // HttpClient
    
  ],
  providers:[
    ApiService
  ]
})
export class SharedModule { }
