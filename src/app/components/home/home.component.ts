import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showAddEventForm: boolean = false;
  subscription: Subscription;

  
  constructor(private uiService: UiService) { 
    /* subscribe this component to the service so it listens to 
       any changes on whether to display the AddEventform*/
    this.subscription = this.uiService
      .onOpenForm()
      .subscribe((value) => (this.showAddEventForm = value));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}