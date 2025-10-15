import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaygroundCenterComponent } from './playground-center.component';

describe('PlaygroundCenterComponent', () => {
  let component: PlaygroundCenterComponent;
  let fixture: ComponentFixture<PlaygroundCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaygroundCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaygroundCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
