import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxgraphngComponent } from './mxgraphng.component';

describe('AngularmxgraphComponent', () => {
  let component: MxgraphngComponent;
  let fixture: ComponentFixture<MxgraphngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxgraphngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxgraphngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
