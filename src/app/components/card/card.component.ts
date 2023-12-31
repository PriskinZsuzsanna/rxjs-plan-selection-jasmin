import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() item : Data = { 
    deal: '',
    price: 0,
    storage: 0,
    users: 0,
    send: 0}

    @Input() plan$ : Observable<string> = new Observable<string>()
    @Output() set = new EventEmitter()

    setPlan(plan:string){
      this.set.emit(plan)
    }
}
