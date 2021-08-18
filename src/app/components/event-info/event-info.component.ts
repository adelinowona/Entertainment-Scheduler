/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import {Component, Inject, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditEventComponent} from '../edit-event/edit-event.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
})
export class EventInfoComponent implements OnInit {
  event: any;

  constructor(public dialogRef: MatDialogRef<EventInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  // initialize the component with the event data
  ngOnInit(): void {
    this.removeOverlay();
    this.event = this.data.event;
  }

  // defocus the info card
  private removeOverlay() {
    document.querySelectorAll<HTMLElement>('.cdk-overlay-backdrop')[0].style.background = 'rgb(0, 0, 0, .0)';
  }

  // closes the info card
  close(): void {
    this.dialogRef.close();
  }

  // deletes the event from the calendar
  delete() {
    this.event.remove();
    this.close();
    this.snackBar.open('Deleted Event!', '', {
      duration: 3000,
    });
  }

  // opens the form to edit the event
  edit(): void {
    this.dialog.open(EditEventComponent, {
      data: this.event,
    });
    this.close();
  }
}
