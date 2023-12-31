import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { of } from 'rxjs';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit set event when setPlan is called', () => {
    const plan = 'basic';
    const setPlanSpy = spyOn(component.set, 'emit');

    component.setPlan(plan);

    expect(setPlanSpy).toHaveBeenCalledWith(plan);
  });

  it('should display item properties', () => {
    const item = {
      deal: 'Deal 1',
      price: 100,
      storage: 50,
      users: 10,
      send: 5,
    };
  
    component.item = item;
    fixture.detectChanges();
  
    const element = fixture.nativeElement;
    const dealElement = element.querySelector('.plan');
    const priceElement = element.querySelector('.price');
    const storageElement = element.querySelector('.box-1');
    const usersElement = element.querySelector('.box-2');
    const sendElement = element.querySelector('.box-3');
  
    expect(dealElement.textContent).toContain('Deal 1');
    expect(priceElement.textContent).toContain('100');
    expect(storageElement.textContent).toContain('50');
    expect(usersElement.textContent).toContain('10');
    expect(sendElement.textContent).toContain('5');
  });
  

  it('should update plan$ when a new plan is provided', () => {
    const newPlan$ = of('professional');
    component.plan$ = newPlan$;

    fixture.detectChanges();

    expect(component.plan$).toBe(newPlan$);
  });

  it('should set ngClass based on plan$ value', async(() => {
    const plan = 'professional';
    const item = { deal: 'professional' };

    component.item = item;
    component.plan$ = of(plan);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const element = fixture.nativeElement.querySelector('.card'); // Replace with your actual class selector
      expect(element.classList.contains('active')).toBe(true);
    });
  }));

  it('should set ngClass to none, if plan$ value does not match item.deal', async(() => {
    const plan = 'professional';
    const item = { deal: 'basic' };

    component.item = item;
    component.plan$ = of(plan);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const element = fixture.nativeElement.querySelector('.card'); // Replace with your actual class selector
      expect(element.classList.contains('none')).toBe(true);
    });
  }));
});
