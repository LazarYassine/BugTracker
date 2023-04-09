import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsListComponent } from './bugs-list.component';

describe('BugsListComponent', () => {
  let component: BugsListComponent;
  let fixture: ComponentFixture<BugsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
