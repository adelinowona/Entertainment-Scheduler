import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  // different colors assignable to created events
  colors: any[] = ['#FF2626','#FF8C26', '#FBBC04', '#04F100', '#3390FF', '#AF6CFF', '#E334FF'];

  // formgroup for the info submitted for a regular event
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    isRecurring: new FormControl(false, [Validators.required]),
    allDay: new FormControl(false),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    backgroundColor: new FormControl(''),
    groupId: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<EditEventComponent>, private addEventService: EventService, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.editForm.value.title = this.data.title;
    this.editForm.value.isRecurring = this.data.extendedProps.isRecurring;
    this.editForm.value.allDay = this.data.allDay;
    this.editForm.value.start = this.data.start;
    this.editForm.value.end = this.data.end;
    this.editForm.value.description = this.data.extendedProps.description;
    this.editForm.value.backgroundColor = this.data.backgroundColor;
    this.editForm.value.endTime = this.data.endTime;
    this.editForm.value.startTime = this.data.startTime;
    this.editForm.value.groupId = this.data.groupId;
  }

  // closes the edit event form that is open
  close(): void {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
  }

  // submits the data for the edited event
  submit(): void {
    console.log(this.editForm.value);
    this.close();
  }
}
