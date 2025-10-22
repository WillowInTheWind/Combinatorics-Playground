import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomDisplayComponent } from './random-display.component';

describe('RandomDisplayComponent', () => {
  let component: RandomDisplayComponent;
  let fixture: ComponentFixture<RandomDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
