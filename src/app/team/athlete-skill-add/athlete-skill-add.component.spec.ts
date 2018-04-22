import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteSkillAddComponent } from './athlete-skill-add.component';

describe('AthleteSkillAddComponent', () => {
  let component: AthleteSkillAddComponent;
  let fixture: ComponentFixture<AthleteSkillAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthleteSkillAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteSkillAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
