import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeApiDialogComponent } from './change-api-dialog.component';

describe('ChangeApiDialogComponent', () => {
  let component: ChangeApiDialogComponent;
  let fixture: ComponentFixture<ChangeApiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeApiDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeApiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
