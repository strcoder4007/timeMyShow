import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsComponent } from './subs.component';

describe('SubsComponent', () => {
  let component: SubsComponent;
  let fixture: ComponentFixture<SubsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
