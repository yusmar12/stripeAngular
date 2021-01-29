import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentElementSeparatedComponent } from './intent-element-separated.component';

describe('IntentElementSeparatedComponent', () => {
  let component: IntentElementSeparatedComponent;
  let fixture: ComponentFixture<IntentElementSeparatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentElementSeparatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentElementSeparatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
