import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  disableTime = true;
  next = 0;

  timeSchedule: {[key:string]: any[]} = {};

  scheduleForm = new FormGroup({
    currDay: new FormControl(''),
    startTime: new FormControl('12:00'),
    endTime: new FormControl('23:59')
  })

  constructor(public dialogRef: MatDialogRef<TimeTableComponent>, private dataService: DataService) { }

  ngOnInit(): void {
    this.timeSchedule ={
      'Sunday': [],
      'Monday': [],
      'Tuesday': [],
      'Wednesday': [],
      'Thursday': [],
      'Friday': [],
      'Saturday': []
    }
  }

  // Next button functionality. Saves details of current day and goes to the next one
  nextDay(){
    if(this.disableTime == false){
      this.timeSchedule[this.scheduleForm.value.currDay] = [this.scheduleForm.value.startTime, this.scheduleForm.value.endTime];
      this.next = this.days.indexOf(this.scheduleForm.value.currDay) + 1;
      if(this.next == 6)
      {
        this.next = 0;
      }
      this.scheduleForm.value.currDay = this.days[this.next];
    }
  }

  // Save button functionality. Saves all entered data.
  onSave(){
    if(this.disableTime == false){
      this.timeSchedule[this.scheduleForm.value.currDay] = [this.scheduleForm.value.startTime, this.scheduleForm.value.endTime];
    }
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
    this.dataService.setTimeTable(this.timeSchedule);
  }

}
