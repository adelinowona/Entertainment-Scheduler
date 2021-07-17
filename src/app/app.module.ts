import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FullCalendarModule } from '@fullcalendar/angular'; // for fullcalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddEventBoxComponent } from './components/add-event-box/add-event-box.component';
import { SideOptionsComponent } from './components/side-options/side-options.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEventBoxComponent,
    SideOptionsComponent,
    FullCalendarComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule // register FullCalendar with the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
