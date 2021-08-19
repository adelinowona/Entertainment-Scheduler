/* eslint-disable max-len */
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddEventBoxComponent} from '../components/add-event-box/add-event-box.component';
import {EventInfoComponent} from '../components/event-info/event-info.component';
import {TimeTableComponent} from '../components/time-table/time-table.component';


@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(public dialog: MatDialog) {}

  // opens the add event form
  openAddEvent(): void {
    this.dialog.open(AddEventBoxComponent);
  }

  // opens the add event form with date set to clicked date
  openAddEventSeeded(date: any): void {
    this.dialog.open(AddEventBoxComponent);
  }

  // opens the popup containing info about the event
  openClickedEventInfo(event: any): void {
    this.dialog.open(EventInfoComponent, {
      data: event,
    });
  }

  // opens the time table form
  openTimeTable(): void {
    this.dialog.open(TimeTableComponent);
  }
}
