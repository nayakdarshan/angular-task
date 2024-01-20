import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../service/api.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { GroupDialogComponent } from '../group-dialog/group-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
export interface Member {
  name: string;
}
@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent implements OnInit{
  @Output()totalGroups =new EventEmitter<any>();
  @Output() updatedGroups = new EventEmitter<any>();
  @Output()showChangeApiButton =new EventEmitter<boolean>();

  public data:any;
  panelOpenState = false;
  members: Member[] = [];
  announcer = inject(LiveAnnouncer);
  public loader:boolean = false;
  public initialExpandedIndex = 0;
  // public showChangeApiButton:boolean = false;
  constructor(
    public apiService:ApiService,
    public dialog:MatDialog,
  ){
    this.showChangeApiButton.emit(false);
  }
  ngOnInit(): void {
    this.getGroups();
  }
  createGroup(operation:any){
    sessionStorage.setItem('operation',operation);
    let dialogRef = this.dialog.open(GroupDialogComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.operation = operation;
    dialogRef.componentInstance.group = null;
    dialogRef.afterClosed().subscribe(result => {
      // this.apiService.refreshGroups();
      this.getGroups();
    });
  }
  getGroups(){
    this.loader=true;
    this.apiService.view().subscribe((res: any) => {
      this.data = res;
      localStorage.setItem('totalGroups', this.data.length);
      this.totalGroups.emit(localStorage.getItem('totalGroups'));
      console.log(this.data);
      this.members = res?.map((group: any) => group?.memberNames).flat() || [];    
      console.log(this.members)
      setTimeout(()=>{this.loader=false},1000);
    },(err) =>{
      console.log(err);
      if(err.status == 0){
        this.showChangeApiButton.emit(true);
      }
    });
  }

  trackByFn(index: number, item: any): any {
    return item._id; 
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.members.push({ name: value });
    }

    if (event.chipInput) {
      event.chipInput.clear();
    }
  }
  remove(member: Member): void {
    const index = this.members.indexOf(member);
    if (index >= 0) {
      this.members.splice(index, 1);
      this.announcer.announce(`Removed ${member}`);
    }
  }

  edit(member: Member, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(member);
      return;
    }
    const index = this.members.indexOf(member);
    if (index >= 0) {
      this.members[index].name = value;
    }
  }

  removeItem(group:any){
    console.log(group);
    if(group){
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        disableClose: true,
      });
      dialogRef.componentInstance.groupName = group.groupName;
      dialogRef.afterClosed().subscribe(result => {
        // this.apiService.refreshGroups();
        // this.getGroups();
        if(result.buttonName == 'CONFIRM'){
          this.apiService.delete(group._id).subscribe((res: any) => {
            console.log(res);
            this.getGroups();
          })
        }
      });
      
    }
  }
  copyItem(group:any){
    console.log(group);
    if(group){
      navigator.clipboard.writeText(group);
      sessionStorage.setItem('copiedGroup',JSON.stringify(group));
    }
  }
  editItem(group:any,operation:any){
    sessionStorage.setItem('operation',operation);
    console.log(group);
    sessionStorage.setItem('groupData',JSON.stringify(group));
    let dialogRef = this.dialog.open(GroupDialogComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.operation = operation;
    dialogRef.componentInstance.group = group;

    dialogRef.afterClosed().subscribe(result => {
      // this.apiService.refreshGroups();
      let updatedGroups:any = localStorage.getItem('updatedGroups')
      this.updatedGroups.emit(parseInt(updatedGroups))
      this.getGroups();
    });
  }
}
