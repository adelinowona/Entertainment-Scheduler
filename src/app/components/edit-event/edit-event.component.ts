import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  // different colors assignable to an event
  colors: any[] = [];

  // formgroup for the submitted edited info about the event
  editForm = new FormGroup({
    title: new FormControl(''),
    isRecurring: new FormControl(false),
    allDay: new FormControl(false),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    backgroundColor: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<EditEventComponent>, private addEventService: EventService, @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private colorSource: DataService) {
  }

  ngOnInit(): void {
    this.colors = this.colorSource.colors;
  }

  // sets the edited info for the event
  private setEventData(): boolean {
    let edited = false;
    if(this.editForm.value.title != ''){
      this.data.setProp('title', this.editForm.value.title);
      edited = true;
    }

    if(this.editForm.value.backgroundColor != ''){
      this.data.setProp('backgroundColor', this.editForm.value.backgroundColor);
      this.data.setProp('groupId', this.editForm.value.backgroundColor);
      edited = true;
    }

    if(this.editForm.value.endTime != ''){
      this.data.setProp('endTime', this.editForm.value.endTime);
      edited = true;
    }

    if(this.editForm.value.startTime != ''){
      this.data.setProp('startTime', this.editForm.value.startTime);
      edited = true;
    }

    if(this.editForm.value.description != ''){
      this.data.setExtendedProp('description', this.editForm.value.description);
      edited = true;
    }

    if(this.editForm.value.start != ''){
      this.data.setStart(this.editForm.value.start);
      edited = true;
    }

    if(this.editForm.value.end != ''){
      this.data.setEnd(this.editForm.value.end);
      edited = true;
    }

    if(this.editForm.value.allDay != this.data.allDay){
      this.data.setAllDay(this.editForm.value.allDay);
      edited = true;
    }

    this.data.setExtendedProp('isRecurring', this.editForm.value.isRecurring);
    return edited;
  }

  // closes the edit event form that is open
  close(): void {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
  }

  // submits the data for the edited event
  submit(): void {
    console.log(this.editForm.value);
    let edited = this.setEventData();
    this.close();
    
    if(edited){
        this.snackBar.open("Edited Event!", "", {
        duration: 3000
      });
    }
  }
}
