import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './services/data.service';
import { of } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';
import { GridComponent } from './components/grid/grid.component';
import { CardComponent } from './components/card/card.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, GridComponent, CardComponent],
      providers: [
        { provide: DataService, useClass: MockDataService },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the plan', () => {
    const plan = 'basic';
    spyOn(component.planSubject, 'next');

    component.setPlan(plan);

    expect(component.planSubject.next).toHaveBeenCalledWith(plan);
  });

  it('should change the state', () => {
    const initial = component.stateSubject.value;
    component.changeState();

    expect(component.stateSubject.value).toEqual(!initial);
  });

  it('should modify data based on state', (done) => {
    // Set the state to true
    component.stateSubject.next(true);

    // Trigger change detection
    fixture.detectChanges();

    // Check if the data is modified as expected
    component.data$.subscribe(modifiedData => {
      expect(modifiedData).toEqual([
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 }
      ]);
      done();
    });
  });
});

class MockDataService {
  data$ = of([{ name: 'Item 1', price: 100 }, { name: 'Item 2', price: 200 }]);
}
