import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.css']
})
export class CreateAppComponent implements OnInit {
  Object = Object;
  body: any = {
    name: '',
    subscriptions: []
  };
  knwSubs: any[] = [];
  intentsSubs: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<CreateAppComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  exit() {
    this.dialogRef.close();
  }

  save() {
    const toCommit = this.intentsSubs.filter(item => {
      return this.knwSubs.includes(item.knwId);
    });
    this.body.subscriptions = toCommit.reduce((result, item) => {
      let isIn = false;
      for (let i = 0; i < result.length; i ++) {
        if (result[i].knwId === item.knwId) {
          isIn = true;
          result[i].intents.push(item.intent);
          break;
        }
      }
      if (!isIn) result.push({ knwId: item.knwId, intents: [item.intent]});
      return result;
    }, []);
    this.dialogRef.close({ body: this.body });

  }

  knwlistener($event, knwId) {
    if ($event.checked) return this.knwSubs.push(knwId);
    this.knwSubs = this.knwSubs.filter(item => item !== knwId);
    this.intentsSubs = this.intentsSubs.filter(item => this.knwSubs.includes(item.knwId));
    return;
  }

  intentsListner($event, data) {
    if ($event.checked) return this.intentsSubs.push(data);
    this.intentsSubs = this.intentsSubs.filter(item => item.intent !== data.intent);
  }

  hasIntentSubs() {
    return !!this.intentsSubs.length;
  }

}
