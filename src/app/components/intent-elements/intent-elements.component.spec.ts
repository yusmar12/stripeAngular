import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentElementsComponent } from './intent-elements.component';

describe('IntentElementsComponent', () => {
  let component: IntentElementsComponent;
  let fixture: ComponentFixture<IntentElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
