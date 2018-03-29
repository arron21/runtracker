import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteEventEditComponent } from './athlete-event-edit.component';

describe('AthleteEventEditComponent', () => {
  let component: AthleteEventEditComponent;
  let fixture: ComponentFixture<AthleteEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
