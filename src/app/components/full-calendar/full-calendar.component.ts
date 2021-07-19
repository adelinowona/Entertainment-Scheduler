import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {

  Events = [];
  calendarOptions: CalendarOptions = {};

  constructor(private uiService: UiService) { }

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
      height: 'auto'
    };
  }

  openAddForm() {
    this.uiService.openAddEvent();
  }

}
