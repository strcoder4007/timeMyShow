import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeComponent } from './episode.component';

describe('EpisodeComponent', () => {
  let component: EpisodeComponent;
  let fixture: ComponentFixture<EpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
