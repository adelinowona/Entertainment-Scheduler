import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // different colors assignable to an event
  colors: any[] = ['#FF2626','#FF8C26', '#FBBC04', '#04F100', '#3390FF', '#AF6CFF', '#E334FF'];
  
  // tores the leisure time table
  timeSchedule: {[key:string]: any[]} = {};

  // stores the tv shows in the calendar
  tvShows: string[] = [];

  constructor() { }

  // sets the time schedule
  setTimeTable(arg: any){
    this.timeSchedule = arg;
    console.log(this.timeSchedule);
  }

  // sets the time schedule
  getTimeTable(): any{
    return this.timeSchedule;
  }

  // adds to the TV Shows array
  addShow(arg: string){
    if(!this.tvShows.includes(arg)){
      this.tvShows.push(arg);
    }
  }

  // gets the TV show array
  getTvShows(): any{
    return this.tvShows;
  }

  // removes the TV show
  removeShow(arg: string){
    if(this.tvShows.includes(arg)){
      let index = this.tvShows.indexOf(arg);
      this.tvShows.splice(index,1);
    }
  }
}
