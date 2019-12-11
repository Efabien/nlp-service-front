import { Component, Input } from '@angular/core';
import { AppService } from '../../services/app.service';
import { ErrorService } from '../../services/error.service';
import { NotificationService } from '../../services/notification.service';
import * as sha1 from 'sha1';

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
  processing: boolean;
  stateHash: string;
  token: string;
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
    this.stateHash = this._calculateHash();
  }

  _calculateHash() {
    return sha1(
      this.intentsSubs.map(item => item.intent).sort().join('')
    );
  }

  hasChanges() {
    return this.stateHash !== this._calculateHash();
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

  isIntentChecked(intent) {
    return this.intentsSubs.some(item => item.intent === intent);
  }

  hasIntentSubs() {
    return !!this.intentsSubs.length;
  }

  async save() {
    if (this.processing) return;
    try {
      this.processing = true;
      const toCommit = this.intentsSubs.filter(item => {
        return this.knwSubs.includes(item.knwId);
      });
      const subscriptions = toCommit.reduce((result, item) => {
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
      await this.appService.updateApp(this._appId, { subscriptions });
      this.notificationService.show('Your changes were saved successfully');
      this._load();
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  async generateToken() {
    if (this.processing) return;
    try {
      this.processing = true;
      const { token }: any = await this.appService.generateToken(this._appId);
      this.token = token;
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false
    }
  }

  copyToken() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.token;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notificationService.show('Copied to clipboard');
  }
}
