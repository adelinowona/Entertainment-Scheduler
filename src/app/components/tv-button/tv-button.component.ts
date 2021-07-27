import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tv-button',
  templateUrl: './tv-button.component.html',
  styleUrls: ['./tv-button.component.css']
})
export class TvButtonComponent implements OnInit {
  @Input() addtional: any;
  @Input() year: any;
  @Input() title: any;
  @Input() poster: any;
  @Input() Icon: any;

  constructor() { }

  ngOnInit(): void {
  }

}
