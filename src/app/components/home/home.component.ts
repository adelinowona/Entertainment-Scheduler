import {ChangeDetectorRef, Component, OnInit,HostListener} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {MediaMatcher} from "@angular/cdk/layout";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ViewChild } from '@angular/core';
import { FullCalendarComponent, CalendarOptions, Calendar } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventBoxComponent } from '../add-event-box/add-event-box.component'
import { EventInfoComponent } from '../event-info/event-info.component';
import { EventService } from 'src/app/services/event.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  mobileMode: boolean;
  private _mobileQueryListener: () => void;

  subscription: Subscription;

   @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
   calendarApi!: Calendar;
   calendarOptions: CalendarOptions = {};


  constructor(private uiService: UiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public dialog: MatDialog, private addEventService: EventService, private deviceService: DeviceDetectorService) {
    /* subscribe this component to the Add event service so it listens to
       any changes on whether to add a new event*/
    this.subscription = this.addEventService
      .onEventAdd()
      .subscribe((event) => (this.addToCalendar(event)));

    this.mobileMode = this.deviceService.isMobile();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    let tmp2 = this.mobileQuery.matches;
    let modileData = {
      views:['timeGridWeek','timeGridDay'],
      changeViewTxt: ['Weekly View','Daily View']
    }

    let viewIndex = 0;
    let tmp3 = () => {viewIndex = (viewIndex+1)%2;return viewIndex}

    this.calendarOptions = {
      customButtons: {
        mobileView: {
          text: "Change View", // ToDo: get this to actively update -> modileData.changeViewTxt[viewIndex],
          click: () => {
            this.calendarComponent.getApi().changeView(modileData.views[tmp3()]);
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: this.mobileMode ? 'mobileView' : 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      initialView: this.mobileMode?'timeGridWeek':'dayGridMonth',
      selectable: true,
      select: this.openAddForm.bind(this),
      eventClick: this.openEventInfo.bind(this),
      height: '90vh',
      events: [
            {
              id: 'a',
              title: 'my event',
              start: '2021-08-07',
              backgroundColor: '#FF2626',
              description: 'Lecture'
            }
          ],
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

  // opens the add event form when a date is clicked
  private openAddForm(date: any) {
    this.uiService.openAddEventSeeded(date);
    console.log(date);
  }

  // opens a popup with info about the event
  private openEventInfo(event: any) {
    this.uiService.openClickedEventInfo(event);
    console.log(event);
  }

  // adds an event to the calendar
  addToCalendar(event: any){
    this.calendarApi = this.calendarComponent.getApi();
    this.calendarApi.addEvent(event);
    this.calendarApi.render();
  }

  // allows the user to scroll to move the calendar forward or backward in time
  scroll($event : any){
    var tmp = $event.deltaY;
    if(tmp>0){
      this.calendarComponent.getApi().prev();
    }else if(tmp<0){
      this.calendarComponent.getApi().next();
    }
  }

  // toggles visibility for an event category
  toggleVisibility(status: Boolean, color: String)
  {
    this.calendarApi = this.calendarComponent.getApi();
    let eventArr = this.calendarApi.getEvents();
    for(let i=0; i < eventArr.length; i++){
      let temp = eventArr[i];
      if(status == true){
        if(temp.backgroundColor == color){
          temp.setProp('display', 'none');
        }
      }
      else{
        if(temp.backgroundColor == color){
          temp.setProp('display', 'auto');
        }
      }
    }
  }
}
