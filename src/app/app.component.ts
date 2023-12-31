import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { BehaviorSubject, Observable, combineLatest, map, mergeMap, of, switchMap } from 'rxjs';
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pricing-component-rxjs';

  stateSubject = new BehaviorSubject<boolean>(false)
  stateObservable$ = this.stateSubject.asObservable()

  planSubject = new BehaviorSubject<string>('professional')
  planObservable$ = this.planSubject.asObservable()
  
  data$: Observable<Data[]> = combineLatest([
    this.dataService.data$,
    this.stateObservable$,
  ]).pipe(
    map(([data, stateValue]) => {
      if (stateValue === false) {
        return data;
      } else {
        const modifiedData = data.map(dataItem => {
          return {
            ...dataItem,
            price: dataItem['price'] / 10,
          };
        });
  
        return modifiedData;
      }
    })
  );

  constructor(private dataService: DataService){}

  setPlan(plan:string){
    this.planSubject.next(plan)
  }

  changeState(){
    let actual = this.stateSubject.value
    console.log(actual)
    this.stateSubject.next(!actual)
  }
}
