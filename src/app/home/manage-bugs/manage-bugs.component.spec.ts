import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBugsComponent } from './manage-bugs.component';

describe('ManageBugsComponent', () => {
  let component: ManageBugsComponent;
  let fixture: ComponentFixture<ManageBugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBugsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
