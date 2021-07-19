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

  //Dropdown Button Functionality
  //Button click shows dropdown menu
  dropdown_legend()
  {
    document.getElementById("dropdown-checks")!.classList.toggle("show");
  }

  onCreate() {
    this.uiService.openAddEvent();
  }
}
