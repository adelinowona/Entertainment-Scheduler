import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { HomeComponent } from '../home/home.component';


@Component({
  selector: 'app-side-options',
  templateUrl: './side-options.component.html',
  styleUrls: ['./side-options.component.css']
})
export class SideOptionsComponent implements OnInit {
  
  constructor(private uiService: UiService, private homeComponent: HomeComponent) {}

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

  checkVisible($event: any, color: number){
    let colors: {[key:number]:string} = {};
    colors =
    {
      1: '#FF2626',
      2: '#FF8C26',
      3: '#FBBC04',
      4: '#04F100',
      5: '#3390FF',
      6: '#AF6CFF',
      7: '#E334FF'
    }
    let actual = colors[color];
    this.homeComponent.toggleVisibility($event.checked, actual);
  }
}
