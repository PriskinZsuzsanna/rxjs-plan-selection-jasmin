import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { BehaviorSubject, Observable, of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive state as Observable<boolean>', () => {
    const state = false
    component.state = of(state)
    fixture.detectChanges()
    expect(component.state).toBeDefined()
    expect(component.state instanceof Observable).toBe(true)

    component.state.subscribe((receivedState) => {
      expect(receivedState).toEqual(state)
    })
    })

    it('should emit changeState on toggleState call', () => {
      const toggleSpy = spyOn(component.changeState, 'emit')
      component.toggleState()
      expect(toggleSpy).toHaveBeenCalled()
    })

    it('should not apply "toggled class initially, should apply "toggled" class when state is true', () => {
      const stateSubject = new BehaviorSubject<boolean>(false);
      component.state = stateSubject.asObservable();
  
      fixture.detectChanges(); // Trigger initial data binding
  
      const element = fixture.nativeElement.querySelector('.toggle-ball'); // Replace with the actual selector
  
      // Initially, the class should be "toggled"
      expect(element.classList.contains('none')).toBeTruthy();
      expect(element.classList.contains('toggled')).toBeFalsy();
  
      // Change the state to false
      stateSubject.next(true);
      fixture.detectChanges();
  
      expect(element.classList.contains('none')).toBeFalsy();
      expect(element.classList.contains('toggled')).toBeTruthy();
    });
});
