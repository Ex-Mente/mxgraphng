import { TestBed, async } from '@angular/core/testing';
import { LayouteditorComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayouteditorComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LayouteditorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mxgraph-example-editor'`, () => {
    const fixture = TestBed.createComponent(LayouteditorComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mxgraph-example-editor');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LayouteditorComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('mxgraph-example-editor app is running!');
  });
});
