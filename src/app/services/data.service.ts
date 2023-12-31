import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { EMPTY, catchError, map, shareReplay } from 'rxjs';

type Incoming = {
 data: Array<Data>
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data$ = this.http.get<Incoming>('assets/data.json').pipe(
    map(data => data.data),
    shareReplay(1),
    catchError(err => {
      console.log(err)
      return EMPTY
    })
  )

  constructor(private http: HttpClient) {}
}
