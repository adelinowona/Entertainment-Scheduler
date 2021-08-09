import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HomeComponent } from '../home/home.component';
import { ApiService } from 'src/app/services/api.service';
import {MatButtonModule} from '@angular/material/button';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-event-box',
  templateUrl: './add-event-box.component.html',
  styleUrls: ['./add-event-box.component.css']
})
export class AddEventBoxComponent implements OnInit {
  searchResult: any;
  searchError = "";

  // different colors assignable to created events
  colors: any[] = [];
  daysOfWeek: string[] = [];
  selectedSeasons: number[] = [];

  tvSeachInput: any;

  selectedTvInfo: any;
  selectedColor: any;
  seasonArray: any[] = [];

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
    backgroundColor: new FormControl('#FF2626'),
    groupId: new FormControl(''),
    borderColor: new FormControl(''),
    daysOfWeek: new FormControl(''),
    startRecur: new FormControl('')
  })

  // formgroup for the info submitted for a TV show event
  tvForm = new FormGroup({
    episodesPerDay: new FormControl(1),
    backgroundColor: new FormControl('#FF2626'),
    groupId: new FormControl('')
  })

  constructor(public dialogRef: MatDialogRef<AddEventBoxComponent>, private addEventService: EventService, private apiService: ApiService, private dataSource: DataService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.searchResult = null;
    this.selectedTvInfo = null;
    this.colors = this.dataSource.colors;
  }

  // closes the Add event form that is open
  close(): void {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .32)";
    this.dialogRef.close();
  }

  // defocus the add event form
  removeOverlay() {
    document.querySelectorAll<HTMLElement>(".cdk-overlay-backdrop")[0].style.background = "rgb(0, 0, 0, .0)";
  }

  // searches for the tv show from the user input using the api
  seachTV(val: any) {
    this.apiService.search(val)
      .then(res => {
        // console.log(res.data);
        if (res.data.Response) {
          this.searchError = "";
          this.searchResult = res.data.Search;
        } else {
          this.searchError = res.data.Error;
        }
      })
  }

  // confirms the selected tv show and retrieves its seasons
  select(tvInfo: any) {
    this.apiService.getFromId(tvInfo.imdbID)
      .then(res => {
        this.selectedTvInfo = res.data;

        this.seasonArray = [];
        this.apiService.getTVFromTMDB().then(resp => {
          for (let i = 1; i <= parseInt(this.selectedTvInfo.totalSeasons); i++) {
            // @ts-ignore
            this.seasonArray.push(resp.data.seasons[i]);
          }
        })
      })
  }

  // cancels the select
  cancelSelect() {
    this.selectedTvInfo = null;
    this.seasonArray = [];

  }

  // adds a day when defining recurrence and removes a day if already exists
  updateDaysOfWeek(day: string){
    if(this.daysOfWeek.indexOf(day) == -1){
      this.daysOfWeek.push(day);
    }
    else{
      this.daysOfWeek.splice(this.daysOfWeek.indexOf(day), 1);
    }
  }

  // submits the data for a regular event
  submit(): void {
    console.log(this.eventForm.value);
    
    this.eventForm.value.groupId = this.eventForm.value.backgroundColor;
    this.eventForm.value.borderColor = this.eventForm.value.backgroundColor;
    if(this.eventForm.value.isRecurring){
      let today = new Date();
      this.eventForm.value.daysOfWeek = this.daysOfWeek;
      this.eventForm.value.startRecur = today.toISOString();
    }
    this.addEventService.addEvent(this.eventForm.value);
    this.close();
  }

  // adds and stores selected season numbers into an array
  addToSelected(season: number){
    if(this.selectedSeasons.indexOf(season) == -1){
      this.selectedSeasons.push(season);
    }
    else{
      this.selectedSeasons.splice(this.selectedSeasons.indexOf(season), 1);
    }
  }

  // submits data for a TV show event
  submitTv(): void {
    console.log(this.tvForm.value);
    this.generateTV();
    this.close();
  }

  // Generates the tv schedule event blocks
  generateTV(){
    let timeSchedule = this.dataSource.getTimeTable();
    this.daysOfWeek.sort();
    this.selectedSeasons.sort();
    if(Object.keys(timeSchedule).length == 0){
      this.snackBar.open("No Leisure Time Table Set!", "", {
        duration: 3000,
        verticalPosition: 'top'
      });
    }
    else{
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      let today = new Date();
      let currSelectedDay = 0;

      let day = days[parseInt(this.daysOfWeek[currSelectedDay])];
      let currStartTime = timeSchedule[day][0];

      let episodes_runtime = this.selectedTvInfo.Runtime;
      let seriesName: string = this.selectedTvInfo.Title;
      if(seriesName.length > 10){
        seriesName = seriesName.substring(0,11) + '...';
      }

      for (let i = 0; i < this.selectedSeasons.length; i++) {
        let eps = this.seasonArray[this.selectedSeasons[i]-1].episode_count;
        for(let j = 0; j < eps; j++){

          let name = seriesName + '(S' + this.seasonArray[this.selectedSeasons[i]-1].season_number + "E" + (j+1) + ')';

          let dateIncrement = parseInt(this.daysOfWeek[currSelectedDay]) - today.getDay();
          if(dateIncrement < 0){
            dateIncrement += 7;
          }
          dateIncrement *= 86400000;
          today.setTime(today.getTime() + dateIncrement);

          this.addEventService.addEvent({
            id: name,
            title: name,
            backgroundColor: this.tvForm.value.backgroundColor,
            start: new Date().setTime(today.getTime()),
            startTime: '',
            endTime: '',
          })
          currSelectedDay += 1;
          currSelectedDay %= this.daysOfWeek.length;
        }
      }
    }
  }
}
