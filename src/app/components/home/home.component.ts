import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {MediaMatcher} from "@angular/cdk/layout";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, Calendar } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventBoxComponent } from '../add-event-box/add-event-box.component'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  showAddEventForm: boolean = false;
  subscription: Subscription;

   @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
   calendarApi!: Calendar;
   calendarOptions: CalendarOptions = {};


  constructor(private uiService: UiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog) {
    /* subscribe this component to the service so it listens to
       any changes on whether to display the AddEventform*/
    this.subscription = this.uiService
      .onOpenForm()
      .subscribe((value) => (this.showAddEventForm = value));

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: 'dayGridMonth',
      selectable: true,
      select: this.openAddForm.bind(this),
      height: '90vh'
    };
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
  
  // re-renders the calendar after toggling the side options window
  render() {
    this.calendarApi = this.calendarComponent.getApi();
    setTimeout(() => {
      this.calendarApi.render();
    }, 400);
  }

  openAddForm(arg: any) {
    this.dialog.open(AddEventBoxComponent);
    console.log(arg);
  }

}
