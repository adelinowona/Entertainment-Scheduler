import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { FullCalendarModule } from '@fullcalendar/angular'; // for fullcalendar
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'; // a plugin!

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddEventBoxComponent } from './add-event-box/add-event-box.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddEventBoxComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule // register FullCalendar with the app
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
