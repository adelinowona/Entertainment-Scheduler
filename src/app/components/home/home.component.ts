import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  showAddEventForm: boolean = false;
  subscription: Subscription;


  constructor(private uiService: UiService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    /* subscribe this component to the service so it listens to
       any changes on whether to display the AddEventform*/
    this.subscription = this.uiService
      .onOpenForm()
      .subscribe((value) => (this.showAddEventForm = value));

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
