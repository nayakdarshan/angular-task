import { Component } from '@angular/core';
import { environment } from '../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiConfigService } from '../service/api-config.service';
@Component({
  selector: 'app-change-api-dialog',
  templateUrl: './change-api-dialog.component.html',
  styleUrl: './change-api-dialog.component.scss'
})
export class ChangeApiDialogComponent {
  public env:any;
  constructor(
    private dialogRef:  MatDialogRef<ChangeApiDialogComponent>,
    public router:Router,
    private apiConfigService: ApiConfigService
  ){
    this.env = environment;
  }
  changeApiKey(key:any){
    console.log(key)
    // this.env.APIKey = key;
    this.apiConfigService.setApiKey(key);
    console.log(this.env.environment.getApiKey())
    // this.dialogRef.close();
    window.location.reload();

  }
}
