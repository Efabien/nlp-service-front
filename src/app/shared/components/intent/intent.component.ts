import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent {
  intent: any;

  @Input('activeIntent')
  set activeIntent(activeIntent) {
    this.intent = activeIntent;
    console.log(this.intent);
  }

  constructor(
  ) { }

}
