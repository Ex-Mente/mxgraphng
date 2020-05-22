import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularmxgraphComponent } from './angularmxgraph.component';

describe('AngularmxgraphComponent', () => {
  let component: AngularmxgraphComponent;
  let fixture: ComponentFixture<AngularmxgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularmxgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularmxgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
