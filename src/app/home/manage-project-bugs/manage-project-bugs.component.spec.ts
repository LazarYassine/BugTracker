import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectBugsComponent } from './manage-project-bugs.component';

describe('ManageProjectBugsComponent', () => {
  let component: ManageProjectBugsComponent;
  let fixture: ComponentFixture<ManageProjectBugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProjectBugsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjectBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
