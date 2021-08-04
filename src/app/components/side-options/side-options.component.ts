import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-side-options',
  templateUrl: './side-options.component.html',
  styleUrls: ['./side-options.component.css']
})
export class SideOptionsComponent implements OnInit {

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
  }

  // opens the add event form when create is clicked
  onCreate() {
    this.uiService.openAddEvent();
  }

  // opens the leisure time table when the titular button is clicked
  onLeisureTimeTable() {
    this.uiService.openTimeTable();
  }

  toggleVisibility(event: any){
    //Do stuff
  }
}
