import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AddEventService} from "../../services/add-event.service";

@Component({
  selector: 'app-add-event-box',
  templateUrl: './add-event-box.component.html',
  styleUrls: ['./add-event-box.component.css']
})
export class AddEventBoxComponent implements OnInit {
  searchResult: any;
  searchError = "";

  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    isRecurring: new FormControl('', [Validators.required]),
  })

  tvForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    isRecurring: new FormControl('', [Validators.required]),
  })

  tvSeachInput: any;

  selectedTvInfo: any;
  seasonArray = [];
  constructor(public dialogRef: MatDialogRef<AddEventBoxComponent>, private addEventService: AddEventService) {
  }

  ngOnInit(): void {
    this.searchResult = null;
    this.selectedTvInfo = null;
  }

  close(): void {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
  }

  removeOverlay() {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .0)";
  }

  seachTV(val: any) {
    this.addEventService.search(val)
      .then(res => {
        console.log(res.data);
        if (res.data.Response) {
          this.searchError = "";
          this.searchResult = res.data.Search;
        } else {
          this.searchError = res.data.Error;
        }
      })
  }

  select(tvInfo: any) {
    this.addEventService.getFromId(tvInfo.imdbID)
      .then(res => {
        this.selectedTvInfo = res.data;

        this.seasonArray = [];

        for (let i = 1; i <= parseInt(this.selectedTvInfo.totalSeasons); i++) {
          // @ts-ignore
          this.seasonArray.push(i);
        }
      })

  }

  cancelSelect() {
    this.selectedTvInfo = null;
    this.seasonArray = [];

  }
}
