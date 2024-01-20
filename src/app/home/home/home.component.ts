import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { GroupListComponent } from '../../shared/group-list/group-list.component';
import { GroupDialogComponent } from '../../shared/group-dialog/group-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../shared/service/api.service';
import { ChangeApiDialogComponent } from '../../shared/change-api-dialog/change-api-dialog.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    GroupListComponent,
    GroupDialogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public totalGroups:any;
  public groupsUpdated:any;
  public showChangeApiButton:boolean = false;
  constructor(
    public dialog :MatDialog,
    private apiService:ApiService
  ){
    this.totalGroups = localStorage.getItem('totalGroups');
    this.groupsUpdated = localStorage.getItem('groupsUpdated');
  }
  ngOnInit(){
    
  }

  onTotalGroupsUpdated(totalGroups: any) {
    this.totalGroups = totalGroups;
  }

  onUpdatedGroups(updatedGroups: any) {
    this.groupsUpdated = updatedGroups;
  }
  onShowChangeApiButton(showChangeApiButton: any) {
    this.showChangeApiButton = showChangeApiButton;
  }
  changeApiKey(){
    let dialogRef = this.dialog.open(ChangeApiDialogComponent, {
      disableClose: true,
    });
    // dialogRef.componentInstance.groupName = group.groupName;
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
