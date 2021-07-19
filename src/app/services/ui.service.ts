import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddEventForm: boolean = false;
  private subject = new Subject<any>();

  constructor() {}

  openAddEvent(): void {
    this.showAddEventForm = !this.showAddEventForm;
    this.subject.next(this.showAddEventForm);
  }

  onOpenForm(): Observable<any> {
    return this.subject.asObservable();
  }
}
