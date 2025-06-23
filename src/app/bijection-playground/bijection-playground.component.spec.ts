import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BijectionPlaygroundComponent } from './bijection-playground.component';

describe('BijectionPlaygroundComponent', () => {
  let component: BijectionPlaygroundComponent;
  let fixture: ComponentFixture<BijectionPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BijectionPlaygroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BijectionPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
