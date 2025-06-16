import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TikzRendererComponent } from './tikz-renderer.component';

describe('TikzRendererComponent', () => {
  let component: TikzRendererComponent;
  let fixture: ComponentFixture<TikzRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TikzRendererComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TikzRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
