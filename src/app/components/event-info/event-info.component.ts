import { Component, Inject, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css']
})
export class EventInfoComponent implements OnInit {

  event: any;

  constructor(public dialogRef: MatDialogRef<EventInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.removeOverlay();
    console.log(this.data);
    this.event = this.data.event;
  }

  removeOverlay() {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .0)";
  }

  close(): void {
    this.dialogRef.close();
  }
}
