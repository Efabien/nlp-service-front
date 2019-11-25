import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { RessourcesService } from '../../services/ressources.service';
import { ErrorService } from '../../services/error.service';
import * as sha1 from 'sha1';

@Component({
  selector: 'app-intent',
  templateUrl: './intent.component.html',
  styleUrls: ['./intent.component.css']
})
export class IntentComponent {
  intent: any;
  newText: string;
  stateHash: string;
  processing: boolean;

  @Input('activeIntent')
  set activeIntent(activeIntent) {
    this.intent = activeIntent;
    console.log(this.intent);
    this.stateHash = sha1(
      this.intent.texts.join('')
    );
  }

  constructor(
    private notificationService: NotificationService,
    private ressourcesService: RessourcesService,
    private errorService: ErrorService,
  ) { }

  async save() {
    if (!this.hasChanges() || this.processing) return;
    this.processing = true;
    try {
      const data = {
        intents: {
          [this.intent.title]: {
            texts: this.intent.texts,
            treshold: this.intent.treshold
          }
        }
      };
      if (this.newText) data.intents[this.intent.title].texts.push(this.newText);
      const { knowledge } : any = await this.ressourcesService.update(this.intent.id, data);
      this.updateSucceed(knowledge);
    } catch (e) {
      this.errorService.show(e);
    } finally {
      this.processing = false;
    }
  }

  private updateSucceed(knowledge) {
    this.notificationService.show('your changes were saved successfully');
    this.newText = '';
    this.ressourcesService.emitKnwldgeUpdate({ knowledge, source: 'intent' });
    const selection = this.ressourcesService.selectIntentFromKnowledge(
      [knowledge], this.intent.title
    );
    this.ressourcesService.emitSelectedIntent({ selection, title: this.intent.title });
  }

  hasChanges() {
    return this.stateHash !== sha1(
      this.intent.texts.join('')
    ) || !!this.newText;
  }

  isSomeTextEmpty() {
    return this.intent.texts.some(text => !text.length);
  }

  hasNoTextToSubmit() {
    return !this.intent.texts.length && !this.newText;
  }

  remove(index) {
    const texts = this.intent.texts;
    this.intent.texts = texts.slice(0, index)
      .concat(texts.slice(index + 1, this.intent.texts.length));
  }
}
