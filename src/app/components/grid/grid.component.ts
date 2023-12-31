import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {
  @Input() data$ = new Observable<Data[]>
  @Input() plan$ = new Observable<string>
  @Output() setEvent = new EventEmitter()

  set(plan:string){
    this.setEvent.emit(plan)
  }
}
