import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCtegoriesComponent } from './manage-ctegories.component';

describe('ManageCtegoriesComponent', () => {
  let component: ManageCtegoriesComponent;
  let fixture: ComponentFixture<ManageCtegoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCtegoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCtegoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
