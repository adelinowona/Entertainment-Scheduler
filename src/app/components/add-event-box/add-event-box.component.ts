import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-event-box',
  templateUrl: './add-event-box.component.html',
  styleUrls: ['./add-event-box.component.css']
})
export class AddEventBoxComponent implements OnInit {
  event_type: any;

  constructor(public dialogRef: MatDialogRef<AddEventBoxComponent>) { }

  ngOnInit(): void {

  }

  close(): void {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
  }

  removeOverlay() {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .0)";
  }
}
