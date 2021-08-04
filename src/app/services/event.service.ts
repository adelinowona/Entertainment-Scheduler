import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  Event: any;
  private subject = new Subject<any>();

  constructor() { }

  addEvent(event: any) {
    this.Event = event;
    this.subject.next(this.Event);
  }

  onEventAdd(): Observable<any> {
    return this.subject.asObservable();
  }
}
