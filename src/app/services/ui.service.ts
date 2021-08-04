import { Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { AddEventBoxComponent } from '../components/add-event-box/add-event-box.component';


@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(public dialog: MatDialog) {}

  openAddEvent(): void {
    this.dialog.open(AddEventBoxComponent);
  }

}
