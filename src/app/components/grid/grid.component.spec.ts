import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComponent } from './grid.component';
import { CardComponent } from '../card/card.component';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent, CardComponent]
    });
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit setEvent when set is called', () => {
    const plan = 'basic'
    const setEventSpy = spyOn(component.setEvent, 'emit')

    component.set(plan)
    expect(setEventSpy).toHaveBeenCalledWith(plan)
  })

  it('should receive plan$ as Observable<string> from AppComponent', () => {
    const plan = 'basic';

    component.plan$ = of(plan)

    fixture.detectChanges()
    expect(component.plan$).toBeDefined()
    expect(component.plan$ instanceof Observable).toBe(true)

    component.plan$.subscribe((receivedPlan) => {
      expect(receivedPlan).toEqual(plan)
    })
  })

  it('should receive data$ as Observable<Data[]> from AppComponent', () => {
    const data = [
      { deal: 'Deal 1', price: 100, storage: 50, users: 10, send: 5 },
      { deal: 'Deal 2', price: 200, storage: 75, users: 15, send: 8 },
    ];

    component.data$ = of(data);

    fixture.detectChanges();

    // Access the GridComponent's data$ property and check if it's an Observable
    expect(component.data$).toBeDefined();
    expect(component.data$ instanceof Observable).toBe(true);

    // Optional: Verify the content of the received data$
    component.data$.subscribe((receivedData) => {
      expect(receivedData).toEqual(data);
    });
  });

  it('should pass data to app-card components', () => {
    const data = [
      { deal: 'Deal 1', price: 100, storage: 50, users: 10, send: 5 },
      { deal: 'Deal 2', price: 200, storage: 75, users: 15, send: 8 },
    ];

    const plan$ = of('basic');

    component.data$ = of(data);
    component.plan$ = plan$;

    fixture.detectChanges();

    const appCardComponents = fixture.debugElement.queryAll(By.directive(CardComponent));

    expect(appCardComponents.length).toBe(data.length);

    appCardComponents.forEach((appCard, index) => {
      const appCardInstance = appCard.componentInstance;
      expect(appCardInstance.item).toBe(data[index]);
      expect(appCardInstance.plan$).toBe(plan$);
    });
  });
});
