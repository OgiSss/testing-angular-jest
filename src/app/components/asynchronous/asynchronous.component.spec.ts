import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { AsynchronousComponent } from './asynchronous.component';

describe('AsynchronousComponent', () => {
  let component: AsynchronousComponent;
  let fixture: ComponentFixture<AsynchronousComponent>;

  beforeEach(async () => {
    // jest.useFakeTimers();
    // jest.spyOn(global, 'setTimeout');
    await TestBed.configureTestingModule({
      declarations: [AsynchronousComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should cal setTimeoutMethod', () => {
  //   component.setTimeoutMethod();
  //   expect(component.timeout).not.toBe('checked');
  //   // jest.advanceTimersByTime(1000);
  //   jest.runAllTimers();
  //   expect(component.timeout).toBe('checked');
  //   expect(setTimeout).toHaveBeenCalledTimes(1);
  // });

  it('should cal asyncMethodWithPromise', (done) => {
    const prom = component.asyncMethodWithPromise();
    prom.then(() => {
      expect(component.timeout).toBe('123');
      done();
    });
  });

  // The waitForAsync utility tells Angular to run the code in a dedicated test zone that intercepts promises.
  it('should cal asyncMethodWithPromise', waitForAsync(() => {
    //sometimes we have to use fixture.whenStable
    // The whenStable utility allows us to wait until all promises have been resolved to run our expectations.
    const prom = component.asyncMethodWithPromise();
    prom.then(() => {
      expect(component.timeout).toBe('123');
    });
  }));

  it('should cal asyncMethodWithPromise fakeAsync', fakeAsync(() => {
    component.asyncMethodWithPromise();
    // flush(); < -- alternative
    // A new utility called flush was introduced in Angular 4.2 and helps with that issue.
    // It simulates the passage of time until the macrotask queue is empty. Macrotasks include things like setTimouts, setIntervals, and requestAnimationFrame.
    tick(1000);
    // Note: Tick can also be used with no argument, in which case it waits until all the microtasks are done (when promises are resolved for example).
    expect(component.timeout).toBe('123');
  }));
});

// https://www.youtube.com/watch?v=HfKdktNB9wA