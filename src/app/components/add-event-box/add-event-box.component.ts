import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HomeComponent } from '../home/home.component';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-add-event-box',
  templateUrl: './add-event-box.component.html',
  styleUrls: ['./add-event-box.component.css']
})
export class AddEventBoxComponent implements OnInit {
  searchResult: any;
  searchError = "";

  // formgroup for the info submitted for a regular event
  eventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    isRecurring: new FormControl(false, [Validators.required]),
    allDay: new FormControl(false),
    start: new FormControl(''),
    end: new FormControl(''),
    description: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  })

  // formgroup for the info submitted for a TV show event
  tvForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    isRecurring: new FormControl('', [Validators.required]),
    episodesPerDay: new FormControl(1),
    groupId: new FormControl(1)
  })

  tvSeachInput: any;

  selectedTvInfo: any;
  seasonArray = [];

  constructor(public dialogRef: MatDialogRef<AddEventBoxComponent>, private addEventService: EventService, private apiService: ApiService) {
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

  // searches for the tv show from the user input
  seachTV(val: any) {
    this.apiService.search(val)
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
    this.apiService.getFromId(tvInfo.imdbID)
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

  // submits the data for a regular event
  submit(): void {
    console.log(this.eventForm.value);
    this.addEventService.addEvent(this.eventForm.value);
    this.close();
  }

  // submits data for a TV show event
  submitTv(): void {
    console.log(this.tvForm.value);
    this.close();
  }
}
