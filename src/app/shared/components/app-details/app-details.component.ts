import { Component, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent {
  _appId: string;
  app: any;
  loading: boolean;
  knwSubs: any[] = [];
  intentsSubs: any[] = [];
  Object = Object;
  @Input() knowledges: any;

  @Input('appId')
  set appId(appId) {
    this._appId = appId;
    this._load();
  }
  constructor(
    private errorService: ErrorService,
    private appService: AppService,
    private notificationService: NotificationService,
  ) { }

  async _load() {
    try {
      this.loading = true;
      const { app, subscriptions }: any = await this.appService.getAppDetails(this._appId);
      this.app = {
        ...app,
        subscriptions
      };
      this._hydrate();
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.loading = false;
    }
  }

  _hydrate() {
    this.knwSubs = this.app.subscriptions.map(item => item.knowledge);
    this.intentsSubs = this.app.subscriptions.reduce((holder, sub) => {
      let toConcat = sub.intents.map(intent => {
        return { intent, knwId: sub.knowledge };
      });
      return holder.concat(toConcat);
    }, []);
  }

  knwlistener($event, knwId) {
    if ($event.checked) return this.knwSubs.push(knwId);
    this.knwSubs = this.knwSubs.filter(item => item !== knwId);
    return;
  }

  intentsListner($event, data) {
    if ($event.checked) return this.intentsSubs.push(data);
    this.intentsSubs = this.intentsSubs.filter(item => item.intent !== data.intent);
  }

  isIntentChecked(intent) {
    return this.intentsSubs.some(item => item.intent === intent);
  }

  hasIntentSubs() {
    return !!this.intentsSubs.length;
  }

  save() {
    
  }

}
