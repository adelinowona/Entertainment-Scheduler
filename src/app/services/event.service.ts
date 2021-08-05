import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  Event: any;
  private subject = new Subject<any>();

  constructor() { }

  // stores an event and creates an observable for it
  addEvent(event: any) {
    this.Event = event;
    this.subject.next(this.Event);
  }

  // returns an observable to the stored event
  onEventAdd(): Observable<any> {
    return this.subject.asObservable();
  }
}
