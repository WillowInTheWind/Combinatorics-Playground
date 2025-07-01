import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingPlaygroundComponent } from './sorting-playground.component';

describe('SortingPlaygroundComponent', () => {
  let component: SortingPlaygroundComponent;
  let fixture: ComponentFixture<SortingPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingPlaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
