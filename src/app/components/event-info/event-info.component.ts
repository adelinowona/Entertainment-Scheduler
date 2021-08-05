import { Component, Inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditEventComponent } from '../edit-event/edit-event.component';



@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  event: any;

  constructor(public dialogRef: MatDialogRef<EventInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  // initialize the modal with the selected event data
  ngOnInit(): void {
    this.removeOverlay();
    console.log(this.data);
    this.event = this.data.event;
  }

  // defocus the modal
  private removeOverlay() {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .0)";
  }

  // closes the modals
  close(): void {
    this.dialogRef.close();
  }

  delete() {
    this.event.remove();
    this.close();
  }

  edit(): void{
    this.dialog.open(EditEventComponent, {
      data: this.event,
    });
    this.close();
  }
}
