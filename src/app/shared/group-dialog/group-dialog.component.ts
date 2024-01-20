import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../service/api.service';
// import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

export interface Member {
  name: string;
}

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule, 
    MatChipsModule, 
    MatIconModule
  ],
  templateUrl: './group-dialog.component.html',
  styleUrl: './group-dialog.component.scss'
})

export class GroupDialogComponent {
  @ViewChild('memberName') memberNameInput!: ElementRef;
  @Input() group: any;
  @Input()operation:any;
  // public group:any;
  // public operation:any;
  public mainGroupForm :FormGroup;
  addOnBlur = true;
  members: Member[] = [];
  copiedGroup : any;
  announcer = inject(LiveAnnouncer);
  apiCallCount: number = 0;

  // readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    public fb :FormBuilder,
    public dialogRef:  MatDialogRef<GroupDialogComponent>,
    public apiService:ApiService,
    public snackbar:MatSnackBar,
  ){
    this.operation = sessionStorage.getItem('operation');
    sessionStorage.removeItem('operation');
    this.copiedGroup = sessionStorage.getItem('copiedGroup');
    sessionStorage.removeItem('copiedGroup');
    console.log(this.operation);
    this.apiService.getApiCallCount().subscribe(count => {
      this.apiCallCount = count;
    });
      let form = {
        groupName : [''],
        adminName : [''],
        memberName : [''],
      }
      this.mainGroupForm = this.fb.group(form);
    // }
    if(this.operation != 'Create'){
      this.group = sessionStorage.getItem('groupData');
      sessionStorage.removeItem('groupData');
      this.buildForm(JSON.parse(this.group));
    }
  }
  buildForm(group:any){
      
    console.log(group)
    if(group){
      let form = {
        groupName : [group.groupName],
        adminName : [group.adminName],
        // memberName : [''],
      }
      this.mainGroupForm = this.fb.group(form);
      this.members = group.memberNames;
    }
  }
  pasteGroup(){
    if(this.copiedGroup){
      console.log("fetched"+this.copiedGroup);
      this.buildForm(JSON.parse(this.copiedGroup));
      this.copiedGroup=null;
    }
  }
  triggerAddMember() {
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

  closeDialog(){
    this.dialogRef.close();
  }

  submitForm(formData: any){
    console.log(formData)
    let reqBody = {
      groupName:formData.groupName,
      adminName:formData.adminName,
      memberNames:this.members,
      createdTime:new Date().toISOString()
    }
    if(this.operation == 'Create'){
      this.apiService.create(reqBody).subscribe((res: any) => {
        console.log(res);
        this.closeDialog();
        this.snackbar.openFromComponent(SnackbarComponent,{
          duration: 4000,
                data: {
                  status: "success",
                  message: "Group successfully created"
                }
        })
      })
    }else{
      this.apiService.edit(this.group._id,reqBody).subscribe((res: any) => {
        console.log(res);
        this.apiService.incrementApiCall(this.group._id);
        localStorage.setItem('updatedGroups',JSON.stringify(this.apiCallCount));
        this.closeDialog();
        this.snackbar.openFromComponent(SnackbarComponent,{
          duration: 4000,
                data: {
                  status: "success",
                  message: "Group successfully Updated"
                },
                panelClass:['.success']
        })
      })
    }
  }
}
