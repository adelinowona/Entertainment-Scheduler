import { Component, OnInit, ViewChild} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { UiService } from 'src/app/services/ui.service';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddEventBoxComponent } from '../add-event-box/add-event-box.component'


@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {

  Events = [];
  calendarOptions: CalendarOptions = {};

  constructor(private uiService: UiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
      selectable: true,
      events: this.Events,
      select: this.openAddForm.bind(this),
      height: '90vh'
    };
  }

  openAddForm() {
    this.dialog.open(AddEventBoxComponent);
  }

}