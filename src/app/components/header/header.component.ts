import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() state = new Observable<boolean>();
  @Output() changeState= new EventEmitter();

  toggleState(){
    this.changeState.emit()
  }
}
