import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UfeComponent } from './ufe.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UfeComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UfeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'ufe'`, async(() => {
    const fixture = TestBed.createComponent(UfeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ufe');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(UfeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ufe!');
  }));
});
